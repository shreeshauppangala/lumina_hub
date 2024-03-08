import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import { getDataFromToken } from '@/app/utils/API_utils';
import { SignUpFormDataI } from '@/app/constants/interfaces';
import { connect } from '../../../dbconfig';
import User from '../../../models/user';

connect();

export const GET = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const user = await User.findOne({ _id: id }).select('-password');
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const body: SignUpFormDataI = await request.json();
    const { email, password } = body;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'User does not exist' },
        { status: 404 },
      );
    }

    const updateFields: Partial<SignUpFormDataI> = body;
    if (password?.length) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      updateFields.password = hashedPassword as string & {
        length: {
          gte: 8;
        };
      };
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, updateFields, {
      new: true,
    }).select('-password');

    return NextResponse.json({
      message: 'User Updated',
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update user', error },
      { status: 500 },
    );
  }
};
