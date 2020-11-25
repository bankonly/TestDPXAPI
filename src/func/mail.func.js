const res = require("ssv-response-no-res");
const Mail = require("nodemailer");
const { HtmlMailThemplate } = require("../storages/otp");

const MailFunc = {
  send: async ({ to, text = "hello from lamo", subject = "from Nome", from = null, otp_code, link }) => {
    const transporter = Mail.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailSendOption = {
      from: from == null ? process.env.MAIL_ID : from,
      to: to,
      subject: subject,
      text: text,
      html: HtmlMailThemplate(otp_code, link),
    };

    const sendMail = await transporter.sendMail(mailSendOption);
    if (sendMail.error) throw new Error("  Mail failed");
  },
  generateLink: ({ host, otp_code }) => host + otp_code,
};

module.exports = MailFunc;
