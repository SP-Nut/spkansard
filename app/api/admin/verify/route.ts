import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token not provided' },
        { status: 401 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // ตรวจสอบ token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & { 
      userId: string; 
      role: string; 
    };
    
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: decoded.userId,
        role: decoded.role
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}