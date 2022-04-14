const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");

// new Email(user, url).sendWelcome();

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `VRDOOR <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   //SendGrid
    //   return nodemailer.createTransport({
    //     service: 'SendGrid',
    //     auth: {
    //       user: process.env.SENDGRID_USERNAME,
    //       pass: process.env.SENDGRID_PASSWORD,
    //     },
    //   });
    // }

    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email.
  async send(template, subject) {
    // 1. render HTML based on a pug template

    const html = pug.renderFile(`${__dirname}/emailTemplates/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2. Define Email Options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3. Create a transport and send email.
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to the VRDOOR Family!");
  }

  async sendPasswordReset() {
    await this.send("passwordReset", "Your password Reset Token | VRDOOR");
  }

  async sendActivationEmail() {
    await this.send("activationEmail", "Please Activate your email!");
  }
};
