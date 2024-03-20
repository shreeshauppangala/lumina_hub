import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;

  const isPublic = ['/signin', '/signup', '/verify_email'].includes(pathName);

  // const adminRoute = [
  //   '/add_product',
  //   '/manage_products',
  //   '/edit_product',
  // ].includes(pathName);

  const token = request.cookies.get('token')?.value;

  // if (adminRoute && !isPublic && token) {
  //   jwt.verify(token, process.env.JWT_SECRET!, (err, decodedData: any) => {
  //     if (err) {
  //       return NextResponse.json({ message: err.name, status: 401 });
  //     }
  //     if (!decodedData?._doc?.isAdmin) {
  //       return NextResponse.json({ message: 'You are not admin', status: 400 });
  //     }
  //     return null;
  //   });
  // }

  if ((isPublic && token) || (!isPublic && !token)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  return null;
};

export const config = {
  matcher: [
    '/signin',
    '/signout',
    '/signup',
    '/verify_email',
    '/profile',
    '/add_product',
    '/manage_products',
    '/edit_product',
  ],
};
