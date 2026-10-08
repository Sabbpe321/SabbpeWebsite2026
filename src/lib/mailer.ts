/**
 * Sends the verification email. Configure SMTP with SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and MAIL_FROM.
 * Without SMTP_HOST (local development) the link is printed to the server log instead.
 */
export async function sendVerificationEmail(to: string, link: string): Promise<void> {
  if (!process.env.SMTP_HOST) { console.log(`[signup] verification link for ${to}: ${link}`); return; }
  const nodemailer = (await import('nodemailer')).default;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port, secure: port === 465, auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined });
  await transport.sendMail({
    from: process.env.MAIL_FROM ?? 'SabbPe <no-reply@sabbpe.com>',
    to,
    subject: 'Confirm your email for SabbPe developer docs',
    text: `Welcome to SabbPe.\n\nConfirm your email to finish creating your developer account:\n${link}\n\nThis link works for 24 hours. If you did not sign up, you can ignore this email.`,
    html: `<p>Welcome to SabbPe.</p><p>Confirm your email to finish creating your developer account.</p><p><a href="${link}" style="display:inline-block;background:#0457F1;color:#fff;padding:10px 18px;border-radius:8px;text-decoration:none;font-weight:600">Confirm my email</a></p><p>Or paste this link into your browser:<br>${link}</p><p>This link works for 24 hours. If you did not sign up, you can ignore this email.</p>`,
  });
}
