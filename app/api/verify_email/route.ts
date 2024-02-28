import { NextResponse, NextRequest } from 'next/server';
import { connect } from '../../../dbconfig';
import User from '../../../models/user';

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

    user.isEmailVerified = true;
    user.verifyEmailToken = null;
    user.verifyEmailTokenExpiry = null;
    await user.save();

    return NextResponse.json({ message: 'Email verified' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
