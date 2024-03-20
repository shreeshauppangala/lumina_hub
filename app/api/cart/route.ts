import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/app/utils/API_utils';
import { connect } from '@/dbconfig';
import User from '@/models/user';
import Product from '@/models/product';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const body = await request.json();
    const user = await User.findOne({ _id: id });
    const product = await Product.findById(body._id);
    const updatedCart = await User.findByIdAndUpdate(
      user?._id,
      {
        $push: { cart: { product: { ...product }, selected_quantity: 1 } },
      },
      {
        new: true,
      },
    );

    return NextResponse.json({
      message: `${product?.name} Added to Cart Successfully`,
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
export const PATCH = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const body = await request.json();
    const user = await User.findOne({ _id: id });
    const cartItemIndex = user?.cart.findIndex((item) => item._id === body._id);

    user!.cart[cartItemIndex!] = body;

    const updatedCart = await User.findByIdAndUpdate(user!._id, user!.cart, {
      new: true,
    });

    return NextResponse.json({
      message: `${body?.name} Updated Successfully`,
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

export const GET = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const user = await User.findOne({ _id: id });
    return NextResponse.json(user?.cart);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
