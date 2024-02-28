import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import User from '@/models/users';

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value || '';

    const decodedToken: { id: string } = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const sendEmail = async ({
  email,
  type,
  _id,
}: {
  email: string;
  type: 'forgotPassword' | 'verifyEmail';
  _id: string;
}) => {
  try {
    const hashedToken = await bcryptjs.hash(_id.toString(), 10);

    const expiryTime = Date.now() + 3600000;

    if (type === 'forgotPassword') {
      await User.findByIdAndUpdate(_id, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: expiryTime,
      });
    } else if (type === 'verifyEmail') {
      await User.findByIdAndUpdate(_id, {
        verifyEmailToken: hashedToken,
        verifyEmailTokenExpiry: expiryTime,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'b59b1b427902c4',
        pass: 'd6f1e0689b39f1',
      },
    });

    const mailResponse = await transport.sendMail({
      from: 'test@lume.com',
      to: email,
      subject: type === 'forgotPassword' ? 'Reset Password' : 'Verify Email',
      text: `Click on the link to ${
        type === 'forgotPassword' ? 'reset your password' : 'verify your email'
      } http://localhost:3000/${type}/${hashedToken}`,
    });

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
