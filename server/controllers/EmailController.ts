import * as express from "express";
import IEmailService from "../services/interfaces/EmailService";
import EmailService from "../services/EmailService";
import { httpStatus } from "../common/Constants";

const emailController = express.Router();
const emailService: IEmailService = new EmailService();

emailController.route("/sendEmail").post(
    async (req, res): Promise<void> => {
        try {
            emailService.send(req.body.email, req.body.title, req.body.content);
        } catch (err) {
            res.status(httpStatus.internalServerError).send({
                error: err
            });
        }
    }
);

export default emailController;
