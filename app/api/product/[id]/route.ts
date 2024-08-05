import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Product from '@/models/product';
import { getDataFromToken } from '@/app/utils/API_utils';
import User from '@/models/user';

export const GET = async (request: NextRequest) => {
  try {
    const id = request.url.split('/')[5];

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: 'Invalid Id' }, { status: 400 });
    }

    const product = await Product.findById(id);
    if (product) {
      return NextResponse.json(product);
    }

    return NextResponse.json({ message: 'No Product found' }, { status: 404 });
  } catch (error) {
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
      data: deletedProduct?.toObject(),
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
