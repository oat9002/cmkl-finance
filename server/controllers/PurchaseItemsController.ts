import * as express from "express";
import { httpStatus } from "../common/Constants";
import IPurchaseItemsService from "../services/interfaces/PurchaseItemsService";
import PurchaseItemsService from "../services/PurchaseItemsService";
import InsertPurchaseItemResponse from "../models/responses/InsertPurchaseItemsResponse";
import GetPurchaseItemsResponse from "../models/responses/GetPurchaseItemsResponse";
import MapHelper from "../common/MapHelper";
import AirtableService from "../services/AirtableService";

const purhaseItemsController = express.Router();
const purchaseItemsService: IPurchaseItemsService = new PurchaseItemsService(
    new AirtableService(),
    new MapHelper()
);

purhaseItemsController.route("/getPurchaseItems").post(
    async (req, res): Promise<void> => {
        const response: GetPurchaseItemsResponse = {
            purchaseItems: []
        };
        try {
            const purchaseItems = await purchaseItemsService.getPurchaseItems(
                req.body
            );
            response.purchaseItems = purchaseItems;

            res.send(response);
        } catch (err) {
            response.errorList = [err.message];

            res.status(httpStatus.internalServerError).send(response);
        }
    }
);

purhaseItemsController.route("/insertPurchaseItems").post(
    async (req, res): Promise<void> => {
        const response: InsertPurchaseItemResponse = {
            isSuccess: false
        };

        try {
            await purchaseItemsService.insertPurchaseItems(req.body);

            response.isSuccess = true;

            res.send(response);
        } catch (err) {
            response.errorList = [err.message];

            res.status(httpStatus.internalServerError).send(response);
        }
    }
);

export default purhaseItemsController;
