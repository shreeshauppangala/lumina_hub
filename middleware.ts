import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const isPublic = path === '/signin' || path === 'signup';

  const token = request.cookies.get('token')?.value || '';

  if (isPublic && token) {
    return NextResponse.redirect('/');
  }

  if (!isPublic && !token) {
    return NextResponse.redirect('/signin');
  }
  return null;
};

export const config = {
  matcher: ['/signin', '/signout', '/signup'],
};
