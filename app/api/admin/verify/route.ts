import { NextRequest, NextResponse } from 'next/server';
import { getBearerToken, verifyAdminToken } from '@/lib/admin-token';

export async function GET(request: NextRequest) {
  try {
    const token = getBearerToken(request.headers.get('authorization')) || request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token not provided' },
        { status: 401 }
      );
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: 'admin',
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
