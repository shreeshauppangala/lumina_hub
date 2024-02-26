import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const response = NextResponse.json({ message: 'successfully logged out' });
    response.cookies.set('token', '', { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
