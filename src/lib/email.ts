import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Visitor Management <no-reply@yourdomain.com>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Email service error:", error);
    return false;
  }
}
