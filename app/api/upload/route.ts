import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
  try {
    // สร้าง supabase admin client สำหรับ server-side
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'ไม่พบไฟล์ที่จะอัพโหลด' },
        { status: 400 }
      );
    }

    // สร้างชื่อไฟล์ที่ไม่ซ้ำ
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `materials/${fileName}`;

    // อัพโหลดไฟล์
    const { error: uploadError } = await supabaseAdmin.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return NextResponse.json(
        { error: `ไม่สามารถอัพโหลดรูปภาพได้: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // ดึง public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('images')
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl
    });

  } catch (error) {
    console.error('API upload error:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการอัพโหลด' },
      { status: 500 }
    );
  }
}