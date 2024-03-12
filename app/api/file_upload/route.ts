import { NextRequest, NextResponse } from 'next/server';
import { postApi } from '@/app/hooks/config';

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.formData();
    body.set('api_key', process.env.CLOUDINARY_API_KEY!);
    body.set('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET!);

    const { data } = await postApi(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/auto/upload`,
      body,
    );

    return NextResponse.json({ url: data.url });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
