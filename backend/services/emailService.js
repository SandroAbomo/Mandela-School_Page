import nodemailer from 'nodemailer';

// The school name appears in every message a parent receives, so it is read from
// the environment rather than hard-coded — rebranding is a .env change, not a
// code change, and the name can never drift out of step with the website again.
const SCHOOL_NAME = process.env.SCHOOL_NAME || 'Mandela Bilingual Nursery and Primary School';

// Relay services such as Brevo log in with a generated SMTP username that is not
// a mailbox, so the address parents see comes from EMAIL_FROM (a sender verified
// with the provider). Mailbox-style SMTP like Gmail can leave it unset.
const FROM_ADDRESS = process.env.EMAIL_FROM || process.env.EMAIL_USER;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Some hosts (Render's free tier among them) silently drop outbound SMTP, so
  // a send never errors — it just waits. Nodemailer's two-minute defaults would
  // leave a member of staff staring at a spinner; these fail the reply in
  // seconds, and the enquiry stays pending as it should.
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 20_000,
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
    from: `"${SCHOOL_NAME}" <${FROM_ADDRESS}>`,
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
    from: `"${SCHOOL_NAME} — Enquiries" <${FROM_ADDRESS}>`,
    to: process.env.ADMIN_EMAIL,
    replyTo: enquiry.email,
    subject: `New enquiry: ${enquiry.subject}`,
    text: `A new enquiry has been submitted.\n\n${details}\n\n${enquiry.message}`,
  });
}
