import express from "express";
import PaymentLogService from "../services/PaymentLogService";
import IPaymentLogService from "../services/interfaces/PaymentLogService";

const paymentLogController = express.Router();
const paymentLogService: IPaymentLogService = new PaymentLogService();

paymentLogController.route("/getPaymentLog").get(
    async (req, res): Promise<void> => {
        const pl = await paymentLogService.getPaymetLogs(req.body);
        res.send(pl);
    }
);

export default paymentLogController;
