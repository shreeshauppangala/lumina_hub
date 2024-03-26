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
    const existingCartItem = user?.cart.find(
      (item) => item.product._id.toString() === body._id,
    );
    const updatedCart = existingCartItem
      ? await User.findOneAndUpdate(
          { _id: id, 'cart._id': existingCartItem._id },
          {
            $set: {
              'cart.$.selected_quantity':
                existingCartItem.selected_quantity + 1,
            },
          },
          { new: true },
        )
      : await User.findByIdAndUpdate(
          user?._id,
          {
            $addToSet: {
              cart: { product: product?._id, selected_quantity: 1 },
            },
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
    const existingCartItem = user?.cart.find(
      (item) => item._id.toString() === body._id,
    );

    const updatedCart = await User.findOneAndUpdate(
      { _id: id, 'cart._id': existingCartItem?._id },
      {
        $set: {
          'cart.$.selected_quantity': body.selected_quantity,
        },
      },
      { new: true },
    );

    return NextResponse.json({
      message: `Quantity updated to ${body.selected_quantity}`,
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
    const data = [];
    if (user) {
      for (let i = 0; i < user.cart.length; i++) {
        const productId = user.cart[i].product;
        const productDetails = await Product.findById(productId);
        if (productDetails) {
          const cartData = user.toObject().cart[i];
          data.push({ ...cartData, product: productDetails });
        }
      }
    }
    return NextResponse.json(data);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
