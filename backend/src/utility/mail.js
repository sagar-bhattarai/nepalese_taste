import nodemailer from "nodemailer";
import config from "../configs/config.js";

const sendMail = async (options) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.adminEmail.address,
            pass: config.adminEmail.password,
        },
    });

    let mailOptions = {
        from: config.adminEmail.address,
        to: options.userEmail,
        subject: options.subject,
        text: options.text,
    };

    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
            throw {
            customStatus: 400,
            customMessage: "failed to send email.",
        };
    }

};
export default sendMail;
