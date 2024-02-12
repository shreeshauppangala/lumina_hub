import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connect } from '../../../dbconfig';
import User from '../../../models/users';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      ...body,
    });
    await newUser.save();

    return NextResponse.json({ message: 'User created', data: newUser });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
