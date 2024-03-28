import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import Demographics from '@/models/demographics';

connect();
export const GET = async (request: NextRequest) => {
  try {
    const queryParams = request.nextUrl.searchParams;
    // const searchText = queryParams.get('search');
    const page = Number(queryParams.get('page'));
    const limit = Number(queryParams.get('limit')) || 10;

    const data = await Demographics.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const total_count = await Demographics.estimatedDocumentCount({});
    const statesList = data.map((obj) => Object.keys(obj.toObject())[1]);

    return NextResponse.json({
      page,
      limit,
      has_more: Math.ceil(total_count / limit) !== page,
      data: statesList,
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
