import nodemailer from "nodemailer";
import { promises as fs } from "fs";
import path from "path";

export const sendEmail = async (to, subject, url) => {
  const filePath = path.join(
    process.cwd(),
    "server",
    "utils",
    "email-service",
    "index.html"
  );
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailTemplate = await fs.readFile(filePath, "utf-8");
    const html = emailTemplate.replace("{{resetURL}}", url);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};
