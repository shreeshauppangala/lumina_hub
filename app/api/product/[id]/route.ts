import { NextRequest, NextResponse } from 'next/server';
import Product from '@/models/product';
import { getDataFromToken } from '@/app/utils/API_utils';
import User from '@/models/user';

export const GET = async (request: NextRequest) => {
  try {
    const id = request.url.split('/')[5];
    const product = await Product.findOne({ _id: id });

    if (product) {
      return NextResponse.json(product);
    }

    return NextResponse.json({ message: 'No Product found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const body = await request.json();
    const user = await User.findOne({ _id: id });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { message: 'Only Admin can Update Product' },
        { status: 400 },
      );
    }
    const updatedProduct = await Product.findByIdAndUpdate(body._id, body, {
      new: true,
    });
    return NextResponse.json({
      message: `${updatedProduct?.name} Updated Successfully`,
      data: {
        ...updatedProduct,
      },
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const userId = getDataFromToken(request);
    const id = request.url.split('/')[5];
    const user = await User.findOne({ _id: userId });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { message: 'Only Admin can Delete Product' },
        { status: 400 },
      );
    }
    const deletedProduct = await Product.findByIdAndDelete(id);
    return NextResponse.json({
      message: `${deletedProduct?.name} Deleted Successfully`,
      data: deletedProduct,
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
