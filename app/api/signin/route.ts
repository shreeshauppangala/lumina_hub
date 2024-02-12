import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connect } from '../../../dbconfig';
import User from '../../../models/users';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { email, password } = body;
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User does not exists' }, { status: 404 });
    }
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ message: 'Invalid Password' }, { status: 400 });
    }

    const tokenData = {
      // eslint-disable-next-line no-underscore-dangle
      id: user._id,
      full_name: user.full_name,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: '1d' });

    const response = NextResponse.json({
      message: 'User logged in successfully',
      data: tokenData,
    });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
