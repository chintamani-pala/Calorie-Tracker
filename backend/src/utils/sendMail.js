import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const sendMail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    const { email, subject, template, data } = options;

    //get the path of the template file
    const templatePath = path.join(import.meta.dirname, "../mails", template);

    //render the email template with ejs
    const html = await ejs.renderFile(templatePath, data);
    const mailOption = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };
    await transporter.sendMail(mailOption, () => {
      console.log(`email sent to ${email}`);
    });
  } catch (error) {
    console.log(error);
  }
};
export default sendMail;
