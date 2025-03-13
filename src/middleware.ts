import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('a-token')?.value;
  const user = request.cookies.get('a-user')?.value;

  if (!token && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/checkout', '/admin/:path*', '/cart/:path*', '/profile/:path*'],
};
