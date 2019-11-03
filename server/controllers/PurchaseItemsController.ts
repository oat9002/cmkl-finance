import express from "express";
import { httpStatus } from "../utils/Utils";
import IPurchaseItemsService from "../services/interfaces/PurchaseItemsService";
import PurchaseItemsService from "../services/PurchaseItemsService";

const purhaseItemsController = express.Router();
const purchaseItemsService: IPurchaseItemsService = new PurchaseItemsService();

purhaseItemsController.route("/getPurchaseItems").post(
    async (req, res): Promise<void> => {
        try {
            const pi = await purchaseItemsService.getPurchaseItems(req.body);
            res.send(pi);
        } catch (err) {
            res.status(httpStatus.internalServerError).send([]);
        }
    }
);

export default purhaseItemsController;
