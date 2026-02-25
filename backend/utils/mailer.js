import nodemailer from "nodemailer";

export function makeTransport() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
}

export async function sendContactMail({ name, email, message }) {
  const transport = makeTransport();

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  });
}