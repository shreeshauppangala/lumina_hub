import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import Demographics from '@/models/demographics';

connect();
export const GET = async (request: NextRequest) => {
  try {
    const searchParam = request.nextUrl.searchParams;
    const state = searchParam.get('state');

    const query = { [state!]: { $exists: true } };

    const data = await Demographics.findOne(query);

    return NextResponse.json(data?.toObject()[state!]);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
