import * as express from "express";
import PurchaseRequisitionService from "./services/PurchaseRequisitionService";
import IPurchaseRequisitionService from "./services/interfaces/PurchaseRequisitionService";
import IPurchaseItemService from "./services/interfaces/PurchaseItemsService";
import PurchaseItemsService from "./services/PurchaseItemsService";
import { requestValidation, httpStatus } from "./utils/Utils";
import PaymentLogService from "./services/PaymentLogService";
import IPaymentLogService from "./services/interfaces/PaymentLogService";
import * as cors from "cors";

// Create a new express application instance
const app = express();
const port = 4000;

const purchaseRequisitionService: IPurchaseRequisitionService = new PurchaseRequisitionService();
const purchaseItemsService: IPurchaseItemService = new PurchaseItemsService();
const paymentLogService: IPaymentLogService = new PaymentLogService();

app.use(cors());
app.use(express.json());
app.use(requestValidation);

app.get("/", (req, res): void => {
    res.send("Hello World!");
});

app.post("/getPurchaseRequisitions", async (req, res): Promise<void> => {
    try {
        const pr = await purchaseRequisitionService.getPurchaseRequsition(req.body);
        res.send(pr);
    }
    catch (err) {
        res.status(httpStatus.internalServerError).send([]);
    }
});

app.post("/getPurchaseItems", async (req, res): Promise<void> => {
    try {
        const pi = await purchaseItemsService.getPurchaseItems(req.body);
        res.send(pi);
    }
    catch (err) {
        res.status(httpStatus.internalServerError).send([]);
    }
});

app.get("/getPaymentLogs", async (req, res): Promise<void> => {
    const pl = await paymentLogService.getPaymetLogs(req.body);
    res.send(pl);
});

app.listen(port, (): void => {
    console.log(`App listening on port ${port}!`);
}); 