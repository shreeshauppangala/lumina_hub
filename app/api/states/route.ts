import { NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import Demographics from '@/models/demographics';

connect();
export const GET = async () => {
  try {
    // const searchParam = request.nextUrl.searchParams;
    // const searchText = searchParam.get('search');

    const data = await Demographics.find({});

    const statesList = data.map((obj) => Object.keys(obj.toObject())[1]);

    return NextResponse.json(statesList);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
