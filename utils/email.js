require("dotenv").config()
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const pug = require("pug");
const { google } = require("googleapis")
const oAuth2Client = new google.auth.OAuth2(
	process.env.CLIENT_ID,
	process.env.CLIENT_SECRET,
	process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
// const accessToken = await oAuth2Client.getAccessToken();
module.exports = class Email {
  constructor(user, url,accessToken) {
    this.to = user?.email;
    this.firstName = user.name?.split(" ")[0];
    this.url = url;
    this.from = `VRDOOR <${process.env.EMAIL_FROM}>`;
    this.accessToken=accessToken
  }

   newTransport() {
       
console.log(this.accessToken);

    return nodemailer.createTransport({
			// host: "smtp.mail.yahoo.com",
			service: "gmail",

			auth: {
				type: "OAuth2",
				user: process.env.EMAIL_FROM,
				// pass: process.env.EMAIL_PASSWORD,
				clientId: process.env.CLIENT_ID,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
				accessToken: this.accessToken,
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
