import { NextResponse, NextRequest } from 'next/server';
import { connect } from '../../../dbconfig';
import User from '../../../models/users';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { token } = body;
    const user = await User.findOne({
      verifyEmailToken: token,
      verifyEmailTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyEmailToken = undefined;
    user.verifyEmailTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: 'Email verified' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
