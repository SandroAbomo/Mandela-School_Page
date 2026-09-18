import nodemailer from 'nodemailer';

// The school name appears in every message a parent receives, so it is read from
// the environment rather than hard-coded — rebranding is a .env change, not a
// code change, and the name can never drift out of step with the website again.
const SCHOOL_NAME = process.env.SCHOOL_NAME || 'Mandela Bilingual Nursery and Primary School';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/** Escape values interpolated into HTML email bodies. */
function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function sendReply({ to, name, subject, reply }) {
  await transporter.sendMail({
    from: `"${SCHOOL_NAME}" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Re: ${subject}`,
    text: `Dear ${name},\n\n${reply}\n\nKind regards,\n${SCHOOL_NAME}`,
    html: `<p>Dear ${escapeHtml(name)},</p><p>${escapeHtml(reply).replace(/\n/g, '<br>')}</p><p>Kind regards,<br>${escapeHtml(SCHOOL_NAME)}</p>`,
  });
}

export async function notifyAdmin(enquiry) {
  if (!process.env.ADMIN_EMAIL) return;

  const details = [
    `From: ${enquiry.name} (${enquiry.email})`,
    enquiry.phone ? `Phone: ${enquiry.phone}` : null,
    enquiry.campus ? `Campus preference: ${enquiry.campus}` : null,
    `Subject: ${enquiry.subject}`,
  ]
    .filter(Boolean)
    .join('\n');

  await transporter.sendMail({
    from: `"${SCHOOL_NAME} — Enquiries" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.subject}`,
    text: `A new enquiry has been submitted.\n\n${details}\n\n${enquiry.message}`,
  });
}
