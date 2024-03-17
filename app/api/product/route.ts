import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/app/utils/API_utils';
import { connect } from '../../../dbconfig';
import Product from '../../../models/product';
import User from '../../../models/user';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const body = await request.json();
    const user = await User.findOne({ _id: id });
    const checkName = await Product.findOne({ name: body.name });

    if (!user?.isAdmin) {
      return NextResponse.json(
        { message: 'Only Admin can Add Products' },
        { status: 400 },
      );
    }

    if (checkName) {
      return NextResponse.json(
        { message: 'Product Already Exists' },
        { status: 400 },
      );
    }

    const newProduct = new Product({
      ...body,
    });
    await newProduct.save();
    return NextResponse.json({
      message: 'Product Added Successfully',
      data: {
        ...newProduct,
      },
    });
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const productsList = await Product.find({});
    return NextResponse.json(productsList);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
