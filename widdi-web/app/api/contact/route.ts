import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email template with beautiful design
function createEmailHTML(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  locale: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      margin: 10px 0 0;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }
    .content {
      padding: 40px 30px;
    }
    .field {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #e5e7eb;
    }
    .field:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .field-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: #6b7280;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .field-value {
      font-size: 16px;
      color: #111827;
      line-height: 1.6;
      word-wrap: break-word;
    }
    .field-value a {
      color: #3b82f6;
      text-decoration: none;
    }
    .field-value a:hover {
      text-decoration: underline;
    }
    .message-box {
      background-color: #f9fafb;
      border-left: 4px solid #3b82f6;
      padding: 20px;
      border-radius: 8px;
      margin-top: 10px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 0;
      color: #6b7280;
      font-size: 14px;
      line-height: 1.6;
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
      color: white;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 8px;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
      margin: 30px 0;
    }
    .icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      vertical-align: middle;
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>🎯 New Contact Form Submission</h1>
      <p>You have received a new message from widdigroup.com</p>
    </div>

    <!-- Content -->
    <div class="content">
      <!-- Name -->
      <div class="field">
        <span class="field-label">👤 Full Name</span>
        <div class="field-value">${data.name}</div>
      </div>

      <!-- Email -->
      <div class="field">
        <span class="field-label">📧 Email Address</span>
        <div class="field-value">
          <a href="mailto:${data.email}">${data.email}</a>
        </div>
      </div>

      ${data.phone ? `
      <!-- Phone -->
      <div class="field">
        <span class="field-label">📱 Phone Number</span>
        <div class="field-value">
          <a href="tel:${data.phone}">${data.phone}</a>
        </div>
      </div>
      ` : ''}

      ${data.company ? `
      <!-- Company -->
      <div class="field">
        <span class="field-label">🏢 Company</span>
        <div class="field-value">${data.company}</div>
      </div>
      ` : ''}

      <div class="divider"></div>

      <!-- Message -->
      <div class="field">
        <span class="field-label">💬 Message</span>
        <div class="message-box">
          <div class="field-value">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>

      <!-- Metadata -->
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #e5e7eb;">
        <span class="field-label">📊 Submission Details</span>
        <div style="margin-top: 12px;">
          <span class="badge">Language: ${data.locale.toUpperCase()}</span>
          <span class="badge">Received: ${new Date().toLocaleString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>Widdi Enterprise Solutions</strong><br>
        This email was sent from the contact form on <a href="https://widdigroup.com" style="color: #3b82f6; text-decoration: none;">widdigroup.com</a>
      </p>
      <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">
        Please respond to this inquiry within 24 hours for optimal customer experience.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, locale } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create transporter (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'widdi.technology@gmail.com',
        pass: process.env.EMAIL_PASSWORD, // App-specific password required
      },
    });

    // Email options
    const mailOptions = {
      from: `"Widdi Contact Form" <${process.env.EMAIL_USER || 'widdi.technology@gmail.com'}>`,
      to: 'widdi.technology@gmail.com',
      replyTo: email,
      subject: `🎯 New Contact Form: ${name} ${company ? `from ${company}` : ''}`,
      html: createEmailHTML({ name, email, phone, company, message, locale: locale || 'en' }),
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
Language: ${locale || 'en'}
Received: ${new Date().toLocaleString()}
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email sent successfully' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
