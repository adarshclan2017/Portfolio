import nodemailer from "nodemailer";

export function makeTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // for 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // Gmail App Password
    },
    requireTLS: true,
    tls: {
      servername: "smtp.gmail.com",
    },
  });
}

export async function sendContactMail({ name, email, message }) {
  const transport = makeTransport();

  await transport.sendMail({
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `New Portfolio Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    replyTo: email, 
  });
}