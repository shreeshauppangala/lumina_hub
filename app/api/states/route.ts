import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import Demographics from '@/models/demographics';

connect();
export const GET = async (request: NextRequest) => {
  try {
    const queryParams = request.nextUrl.searchParams;

    const page = Number(queryParams.get('page'));
    const limit = Number(queryParams.get('limit')) || 10;

    const searchText = queryParams.get('search');
    const searchRegex = new RegExp(`^${searchText}`, 'i');
    const query = searchText?.length ? { state: { $regex: searchRegex } } : {};

    const data = await Demographics.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    const total_count = await Demographics.countDocuments(query);
    const statesList = data.map((obj) => obj.toObject().state);

    return NextResponse.json({
      page,
      limit,
      has_more: total_count ? Math.ceil(total_count / limit) !== page : false,
      data: statesList,
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
