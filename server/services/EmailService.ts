import IEmailService from "./interfaces/EmailService";
import * as nodeMailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

class EmailService implements IEmailService {
    public send(email: string, title: string, content: string): Promise<void> {
        return new Promise((resolve, reject): void => {
            const transport = nodeMailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });

            console.log(process.env.EMAIL_PASSWORD);

            const mailOption: MailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: title,
                html: content
            };

            transport.sendMail(mailOption, (err): void => {
                if (err) {
                    reject(err);
                }
            });
        });
    }
}

export default EmailService;
