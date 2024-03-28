import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import Demographics from '@/models/demographics';

connect();
export const GET = async (request: NextRequest) => {
  try {
    const queryParams = request.nextUrl.searchParams;
    const state = queryParams.get('state');

    const data = await Demographics.findOne({ state });

    return NextResponse.json(data?.toObject().cities);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
