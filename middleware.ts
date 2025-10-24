import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // เพิ่ม pathname ใน header เพื่อให้ layout รู้ว่าอยู่หน้าไหน
  response.headers.set('x-pathname', request.nextUrl.pathname);

  // เช็คเส้นทางที่ต้องการ authentication
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // ยกเว้นหน้า login และหน้า admin หลัก (ที่จะทำ client-side redirect)
    if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin') {
      return response;
    }

    // ตรวจสอบ token จาก cookie
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      // ถ้าไม่มี token ให้ redirect ไปหน้า admin หลัก (ที่จะ redirect ต่อไป login)
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // TODO: สามารถเพิ่มการตรวจสอบ token กับ server ได้
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};