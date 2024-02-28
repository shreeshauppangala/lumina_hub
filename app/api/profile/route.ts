import { NextResponse, NextRequest } from 'next/server';
import { getDataFromToken } from '@/app/utils/API_utils';
import { connect } from '../../../dbconfig';
import User from '../../../models/user';

connect();

export const GET = async (request: NextRequest) => {
  try {
    const id = await getDataFromToken(request);
    const user = await User.findOne({ _id: id }).select('-password');
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
