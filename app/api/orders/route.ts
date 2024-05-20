import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/app/utils/API_utils';
import { connect } from '../../../dbconfig';
import Product from '../../../models/product';
import User from '../../../models/user';

connect();

export const POST = async (request: NextRequest) => {
  try {
    const id = getDataFromToken(request);
    const user = await User.findOne({ _id: id });
    const body = await request.json();

    for (let i = 0; i < body.length; i++) {
      const product = await Product.findOne({ _id: body[i]._id });
      await User.findByIdAndUpdate(
        user?._id,
        {
          $push: {
            orders: {
              order_date: Date.now(),
              total_amount: product!.price * body[i].selected_quantity,
              current_status: 'Order Placed',
              product: {
                item: product,
                selected_quantity: body[i].selected_quantity,
              },
            },
          },
        },
        {
          new: true,
        },
      );

      await Product.findByIdAndUpdate(product, {
        quantity_available:
          product!.quantity_available! - body[i].selected_quantity,
      });
      if (body[i].cart_id) {
        await User.findByIdAndUpdate(
          user?._id,
          {
            $pull: { cart: { _id: body[i].cart_id } },
          },
          {
            new: true,
          },
        );
      }
    }

    return NextResponse.json({ message: 'Order Placed' });
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
    const user = await User.findOne({ _id: id });
    const body = await request.json();

    const existingOrderedItem = user?.orders.find(
      (item) => item._id.toString() === body._id,
    );

    const updatedCart = await User.findOneAndUpdate(
      { _id: id, 'orders._id': existingOrderedItem?._id },
      {
        $set: {
          'orders.$.current_status': body.status,
          [`orders.$.${body.status}_date`]: Date.now(),
        },
      },
      { new: true },
    );

    return NextResponse.json({
      message: `Status updated to ${body.status} for ${existingOrderedItem?.product.item.name}`,
      data: {
        ...updatedCart?.toObject(),
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
    const sortedOrders = user?.orders.sort(
      (a, b) =>
        new Date(a.order_date).getDate() - new Date(b.order_date).getDate(),
    );
    return NextResponse.json(sortedOrders);
  } catch (error: any) {
    if (error.message.includes('Token')) {
      return NextResponse.json({ message: 'Token Expired' }, { status: 401 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
};
