import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { escapeHtml } from '@/lib/sanitize';

interface ContactBody {
  name?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  lineId?: string;
  services?: unknown;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, lastname, phone, email, lineId, message } = body;
    const services = Array.isArray(body.services) ? body.services.map(String) : [];

    if (!name || !phone || !lineId) {
      return NextResponse.json(
        { error: 'กรุณากรอกชื่อ เบอร์โทรศัพท์ และ LINE ID' },
        { status: 400 }
      );
    }

    const phonePattern = /^[0-9\s\-\+\(\)]+$/;
    if (!phonePattern.test(phone)) {
      return NextResponse.json(
        { error: 'กรุณากรอกเบอร์โทรให้ถูกต้อง' },
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: 'ระบบส่งอีเมลยังไม่ได้ตั้งค่า', success: false },
        { status: 500 }
      );
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const submittedAt = new Date().toLocaleString('th-TH');
    const servicesText = services.length > 0 ? services.join(', ') : 'Not specified';

    const emailContent = `
=== New contact from website ===

Name: ${name} ${lastname || ''}
Phone: ${phone}
Email: ${email || 'Not specified'}
LINE ID: ${lineId}
Interested services: ${servicesText}

Message:
${message || 'No additional message'}

Submitted at: ${submittedAt}
================================
    `;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.verify();

    const safeName = escapeHtml(name);
    const safeLastname = escapeHtml(lastname);
    const safePhone = escapeHtml(phone);
    const safeEmail = escapeHtml(email || 'Not specified');
    const safeLineId = escapeHtml(lineId);
    const safeServices = escapeHtml(servicesText);
    const safeMessage = escapeHtml(message || 'No additional message');
    const safeSubmittedAt = escapeHtml(submittedAt);

    await transporter.sendMail({
      from: `"SP Kansard Contact" <${emailUser}>`,
      to: 'spkansards@gmail.com',
      subject: `New website contact: ${name}`,
      text: emailContent,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #314874;">New contact from website</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <p><strong>Name:</strong> ${safeName} ${safeLastname}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>LINE ID:</strong> ${safeLineId}</p>
            <p><strong>Interested services:</strong> ${safeServices}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 10px; border-left: 3px solid #314874;">${safeMessage}</p>
            <p><strong>Submitted at:</strong> ${safeSubmittedAt}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'ขอบคุณสำหรับการติดต่อ เราจะติดต่อกลับในเร็ว ๆ นี้',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'เกิดข้อผิดพลาดในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }
}
