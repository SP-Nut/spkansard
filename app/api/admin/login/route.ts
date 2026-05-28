import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken } from '@/lib/admin-token';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    // เช็ครหัสผ่าน (ในระบบจริงควรใช้ bcrypt)
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { error: 'รหัสผ่านไม่ถูกต้อง' },
        { status: 401 }
      );
    }

    const token = await createAdminToken();
    const response = NextResponse.json({
      success: true,
      token,
      message: 'เข้าสู่ระบบสำเร็จ'
    });

    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 24 * 60 * 60,
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}
