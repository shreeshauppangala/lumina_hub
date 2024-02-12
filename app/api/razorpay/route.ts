import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

export const POST = async (request: NextRequest) => {
  const { amount, currency, receipt, notes } = request.body;

  const options = {
    amount: amount * 100, // Amount is in paise
    currency,
    receipt,
    notes,
  };

  try {
    const order = await razorpay.orders.create(options);
    NextResponse.json({ order });
  } catch (error) {
    NextResponse.json({ error: error.message });
  }
};
