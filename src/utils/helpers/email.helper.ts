import nodemailer from "nodemailer";
import fs from "fs";
import { IUser } from "../../interfaces/user.interface";
import handlebars from "handlebars";

export const sendEmail = async (options: {
  subject: string;
  email: string;
  emailHtml: any;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adedijiabdulquadri@gmail.com",
      pass: "bkdqliicrykfrmof",
    },
  });
  const mailOptions = {
    from: "Serviceo <adedijiabdulquadr@gmail.com>",
    to: options.email,
    subject: options.subject,
    html: options.emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

// const emailTemplateSourceRegisteration = fs.readFileSync(
//   "./src/email/registeration.hbs",
//   "utf8"
// );

// const emailTemplateSourceResendOTP = fs.readFileSync(
//   "./src/email/resendotp.hbs",
//   "utf8"
// );


export const emailManager = async (options: {
  subject: string;
  emailSource: any;
  templateData: any;
  user: IUser;
}) => {

    const emailTemplate = handlebars.compile(options.emailSource)


    await sendEmail({
        subject: options.subject,
        email: options.user.email,
        emailHtml: emailTemplate(options.templateData)
    })
};
