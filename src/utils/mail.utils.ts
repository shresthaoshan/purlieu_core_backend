import nodemailer from "nodemailer";

const sendMail = async (to: string[], subject: string, html: string) => {
	let testAccount = await nodemailer.createTestAccount();

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"Purlieu Co" <no-reply@purlieu.co>`, // sender address
		to: to.join(", "), // list of receivers
		subject, // Subject line
		html, // html body
	});

	console.log("Message sent: %s", info.messageId);
	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

	// Preview only available when sending through an Ethereal account
	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

export const sendNewAppMail = async (to: string[], appName: string, apiKey: string, apiSecret: string) => {
	return sendMail(
		to,
		"New Application Registered",
		`<h1>Hello!</h1>
        <h3>${appName} is now registered.</h3>
        <small>Following are your API credentials.</small>
        <br />
        <br />
        <br />
        <p>API Key: <b>${apiKey}</b></p>
        <p>API Secret: <b>${apiSecret}</b></p>
        <br />
        <small>DO NOT SHARE your credentials with any third party.<small>`
	);
};
