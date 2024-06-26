import { SignUpFormDataI } from '@/app/constants/interfaces';
import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/app/utils/API_utils';
import { connect } from '../../../dbconfig';
import User from '../../../models/user';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body: SignUpFormDataI = await request.json();
    const { email, password, mobile_number } = body;
    const isEmail = await User.findOne({ email });
    const isMobile = await User.findOne({ mobile_number });

    if (isEmail || isMobile) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 },
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      ...body,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    await sendEmail({
      _id: newUser._id,
      email: newUser.email,
      type: 'verifyEmail',
    });

    return NextResponse.json({
      message: 'User created',
      data: {
        _id: newUser._id,
        email: newUser.email,
        full_name: newUser.full_name,
        picture: newUser.picture,
        isAdmin: newUser.isAdmin,
        isEmailVerified: newUser.isEmailVerified,
      },
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
