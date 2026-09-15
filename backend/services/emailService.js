import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendReply({ to, name, subject, reply }) {
  await transporter.sendMail({
    from: `"Nelson Mandela Primary School" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Re: ${subject}`,
    text: `Dear ${name},\n\n${reply}\n\nKind regards,\nNelson Mandela Primary School`,
    html: `<p>Dear ${name},</p><p>${reply.replace(/\n/g, '<br>')}</p><p>Kind regards,<br>Nelson Mandela Primary School</p>`,
  });
}

export async function notifyAdmin(enquiry) {
  if (!process.env.ADMIN_EMAIL) return;
  await transporter.sendMail({
    from: `"School Enquiry System" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New enquiry: ${enquiry.subject}`,
    text: `New enquiry from ${enquiry.name} (${enquiry.email}).\n\nSubject: ${enquiry.subject}\n\n${enquiry.message}`,
  });
}
