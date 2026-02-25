import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactMail({ name, email, message }) {
  await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>", // works immediately
    to: process.env.MAIL_TO,
    subject: `New Portfolio Message from ${name}`,
    reply_to: email,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });
}