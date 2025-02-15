import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
};

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, recipients, subject, message } = dto;
  return await transport.sendMail({
    from: sender,
    to: recipients,
    subject,
    html: message,
  });
};
