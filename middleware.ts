import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const isPublic = ['/signin', '/signup', '/verify_email'].includes(request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;

  if ((isPublic && token) || (!isPublic && !token)) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  return null;
};

export const config = {
  matcher: ['/signin', '/signout', '/signup', '/verify_email', '/profile'],
};
