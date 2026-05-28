import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken } from './lib/admin-token';

const publicAdminPaths = new Set(['/admin', '/admin/login']);

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;

  response.headers.set('x-pathname', pathname);

  if (pathname.startsWith('/admin') && !publicAdminPaths.has(pathname)) {
    const token = request.cookies.get('adminToken')?.value;
    const payload = await verifyAdminToken(token);

    if (!payload) {
      const redirectResponse = NextResponse.redirect(new URL('/admin/login', request.url));
      redirectResponse.cookies.delete('adminToken');
      redirectResponse.headers.set('x-pathname', pathname);
      return redirectResponse;
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|gallery|herosection|heroMobile|manifest.json|robots.txt|sitemap.xml).*)',
  ],
};
