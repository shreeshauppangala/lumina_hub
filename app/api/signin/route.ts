import { NextResponse, NextRequest } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { CredentialResponse } from '@react-oauth/google';
import { GoogleDataI, LoginFormDataI } from '@/app/constants/interfaces';
import User from '@/models/user';
import { connect } from '../../../dbconfig';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body: LoginFormDataI & CredentialResponse = await request.json();
    const { email, password, credential: googleSigninToken } = body;
    const decodedJWT = jwt.decode(googleSigninToken!) as unknown as GoogleDataI;
    const user = await User.findOne({ email: email || decodedJWT.email });

    if (!user) {
      return NextResponse.json(
        { message: 'User does not exists' },
        { status: 404 },
      );
    }

    if (password && !googleSigninToken) {
      const validPassword = await bcryptjs.compare(password, user.password);

      if (!validPassword) {
        return NextResponse.json(
          { message: 'Invalid Password' },
          { status: 400 },
        );
      }
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message: 'User logged in successfully',
      data: {
        _id: user._id,
        email: user.email,
        full_name: user.full_name,
        picture: user.picture,
        isAdmin: user.isAdmin,
        isEmailVerified: user.isEmailVerified,
      },
    });
    response.cookies.set('token', token, { httpOnly: true });

    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
