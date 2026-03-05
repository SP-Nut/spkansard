import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, lastname, phone, email, lineId, services, message } = body;

    // Validate required fields
    if (!name || !phone || !lineId) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อ, เบอร์โทรศัพท์ และ LINE ID' },
        { status: 400 }
      );
    }

    // Validate phone number format
    const phonePattern = /^[0-9\s\-\+\(\)]+$/;
    if (!phonePattern.test(phone)) {
      return NextResponse.json(
        { error: 'กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
=== ข้อมูลติดต่อใหม่จากเว็บไซต์ ===

ชื่อ: ${name} ${lastname || ''}
เบอร์โทร: ${phone}
อีเมล: ${email || 'ไม่ระบุ'}
LINE ID: ${lineId || 'ไม่ระบุ'}
บริการที่สนใจ: ${services.length > 0 ? services.join(', ') : 'ไม่ระบุ'}

รายละเอียด:
${message || 'ไม่มีข้อความเพิ่มเติม'}

เวลาที่ส่ง: ${new Date().toLocaleString('th-TH')}
=======================================
    `;

    // Send email notification
    try {
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return NextResponse.json(
          { error: 'ระบบส่งอีเมลยังไม่ได้ตั้งค่า กรุณาติดต่อผู้ดูแลระบบ', success: false },
          { status: 500 }
        );
      }

      const emailUser = process.env.EMAIL_USER;
      const emailPass = process.env.EMAIL_PASS;

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPass
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      await transporter.verify();

      const mailOptions = {
        from: `"SP Kansard Contact" <${emailUser}>`,
        to: 'spkansards@gmail.com',
        subject: `🔔 ลูกค้าติดต่อใหม่: ${name}`,
        text: emailContent,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #314874;">📬 ข้อมูลติดต่อใหม่จากเว็บไซต์</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>👤 ชื่อ:</strong> ${name} ${lastname || ''}</p>
              <p><strong>📞 เบอร์โทร:</strong> ${phone}</p>
              <p><strong>📧 อีเมล:</strong> ${email || 'ไม่ระบุ'}</p>
              <p><strong>💬 LINE ID:</strong> ${lineId || 'ไม่ระบุ'}</p>
              <p><strong>🛠️ บริการที่สนใจ:</strong> ${services.length > 0 ? services.join(', ') : 'ไม่ระบุ'}</p>
              <p><strong>📝 รายละเอียด:</strong></p>
              <p style="background: white; padding: 10px; border-left: 3px solid #314874;">${message || 'ไม่มีข้อความเพิ่มเติม'}</p>
              <p><strong>🕒 เวลาที่ส่ง:</strong> ${new Date().toLocaleString('th-TH')}</p>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError: unknown) {
      const error = emailError as Error;
      console.error('Email sending failed:', error?.message);
      
      // ส่งต่อ error เพื่อให้ผู้ใช้ทราบ
      return NextResponse.json({
        error: `ส่งอีเมลไม่สำเร็จ: ${error?.message || 'ไม่ทราบสาเหตุ'}`,
        success: false
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'ขอบคุณสำหรับการติดต่อ เราจะติดต่อกลับในเร็วๆ นี้'
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}