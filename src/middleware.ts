import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEFAULTS_PROTECTED_PATHS = [
  '/admin',
  '/cart',
  '/profile',
  '/address',
  '/checkout-overview',
  '/checkout',
];

const CUSTOMER_PROTECTED_PATHS = ['/admin'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('a-token')?.value;
  const user = request.cookies.get('a-user')?.value;
  const userData = JSON.parse(user || '{}');
  const role = userData?.role?.name;
  const path = request.nextUrl.pathname;

  // 🚫 PUBLIC: block access to default protected paths if not authenticated
  if (!token || !user || !role) {
    if (DEFAULTS_PROTECTED_PATHS.some((p) => path.startsWith(p))) {
      console.log('redirecting to login');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return NextResponse.next(); // public route
  }

  // 🚫 ROLE-BASED: block access based on role
  if (
    role === 'CUSTOMER' &&
    CUSTOMER_PROTECTED_PATHS.some((p) => path.startsWith(p))
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow all other authenticated requests
  const response = NextResponse.next();
  response.headers.set('x-pathname', path);
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
