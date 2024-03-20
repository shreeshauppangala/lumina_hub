import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbconfig';
import { getDataFromToken } from '@/app/utils/API_utils';
import User from '@/models/user';

connect();

export const DELETE = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const cartItemId = request.url.split('/')[5];
    const user = await User.findOne({ _id: id });
    const updatedCart = await User.findByIdAndUpdate(
      user?._id,
      {
        $pull: { cart: { _id: cartItemId } },
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      message: `Item Deleted Successfully`,
      data: {
        ...updatedCart,
      },
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
