import { NextRequest, NextResponse } from 'next/server';

const customerOnlyPaths = ['/orders', '/cart'];
const storeOwnerOnlyPaths = ['/dashboard/store'];
const superAdminOnlyPaths = ['/dashboard/superadmin'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // public routes bypass
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/' ||
    pathname.startsWith('/stores') ||
    pathname.startsWith('/auth')
  ) {
    return NextResponse.next();
  }

  const accessToken = req.cookies.get('accessToken')?.value;
  const role = req.cookies.get('userRole')?.value;

  // require auth for the following sections
  const requiresAuth =
    customerOnlyPaths.includes(pathname) ||
    storeOwnerOnlyPaths.includes(pathname) ||
    superAdminOnlyPaths.includes(pathname);

  if (requiresAuth && !accessToken) {
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  // role checks
  if (customerOnlyPaths.includes(pathname) && role !== 'Customer') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (storeOwnerOnlyPaths.includes(pathname) && role !== 'StoreOwner') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (superAdminOnlyPaths.includes(pathname) && role !== 'SuperAdmin') {
    const url = req.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};


