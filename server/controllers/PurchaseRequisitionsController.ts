import * as express from "express";
import PurchaseRequisitionService from "../services/PurchaseRequisitionService";
import IPurchaseRequisitionService from "../services/interfaces/PurchaseRequisitionService";
import { httpStatus } from "../common/Constants";
import AirtableService from "../services/AirtableService";
import MapHelper from "../common/MapHelper";

const purchaseRequisitionsController = express.Router();
const purchaseRequisitionsService: IPurchaseRequisitionService = new PurchaseRequisitionService(
    new AirtableService(),
    new MapHelper()
);

purchaseRequisitionsController.route("/getPurchaseRequisitions").post(
    async (req, res): Promise<void> => {
        try {
            const pr = await purchaseRequisitionsService.getPurchaseRequsition(
                req.body
            );
            res.send(pr);
        } catch (err) {
            res.status(httpStatus.internalServerError).send([]);
        }
    }
);

export default purchaseRequisitionsController;
