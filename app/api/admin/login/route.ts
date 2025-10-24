import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

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

    // สร้าง JWT token
    const token = jwt.sign(
      { 
        admin: true,
        timestamp: Date.now()
      },
      process.env.JWT_SECRET || 'fallback-secret-key',
      { expiresIn: '24h' }
    );

    return NextResponse.json({
      success: true,
      token,
      message: 'เข้าสู่ระบบสำเร็จ'
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในระบบ' },
      { status: 500 }
    );
  }
}