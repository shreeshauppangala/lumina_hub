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
        ...newProduct.toObject(),
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
        ...updatedProduct?.toObject(),
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
    const searchParam = request.nextUrl.searchParams;
    const searchText = searchParam.get('search');
    const searchRegex = new RegExp(`.*${searchText}.*`, 'i');
    const findObj = searchText?.length
      ? {
          name: { $regex: searchRegex },
        }
      : {};
    const productsList = await Product.find(findObj);
    return NextResponse.json(productsList);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
