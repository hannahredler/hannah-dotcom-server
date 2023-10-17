import { Request, Response } from "express";
import nodemailer from "nodemailer";

export interface MessageRequest extends Request {
  body: { name: string; email: string; message: string };
}

exports.sendEmail = async (req: MessageRequest, res: Response) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "Hannah dotcom: Contact form email",
      html: `<p>You've got mail! <br/><br/> 
        <b>Name:</b> ${name} <br/>
        <b>Email</b>: ${email} <br/>
        <b>Message</b>: ${message}</p>`,
    });
    res.status(200).send();
  } catch (e) {
    res.status(500).send();
  }
};
