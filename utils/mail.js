const nodemailer = require("nodemailer");
const fs = require("fs");
const transporter = nodemailer.createTransport({
	service: 'Gmail',
	host: 'smtp.gmail.com',
	port: 587,
	secure: false,
	auth: {
		user: 'kunalvirdi.patiala@gmail.com',
		pass: process.env.PASSWORD,
	},
});

module.exports.sendMail=async (to,text,subject,file)=>{
	const mailOptions = {
		from:"kunalvirdi.patiala@gmail.com",
		to,subject,text,
		attachments:[{
			filename:file.filename,
			path:file.path
		}]
	};
	return await transporter.sendMail(mailOptions)

}