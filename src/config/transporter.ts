import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create the config for the transporter
const config = () => {
  return {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }
};

var transporter = nodemailer.createTransport(config());

export default transporter;