import * as express from "express";
import { json } from "express";
import IRequestValidator from "./validators/interfaces/RequestValidator";
import RequestValidator from "./validators/RequestValidator";
import * as cors from "cors";
import purhaseItemsController from "./controllers/PurchaseItemsController";
import emailController from "./controllers/EmailController";
import paymentLogController from "./controllers/PaymentLogController";
import purchaseRequisitionsController from "./controllers/PurchaseRequisitionsController";

// Create a new express application instance
const app = express();
const port = 4000;
const requestValidator: IRequestValidator = new RequestValidator();

app.use(cors());
app.use(json());
app.use(requestValidator.validate);

app.get("/", (req, res): void => {
    res.send("Hello World!");
});

app.use("/purchaseItems", purhaseItemsController);
app.use("/email", emailController);
app.use("/paymentLog", paymentLogController);
app.use("/purchaseRequisitions", purchaseRequisitionsController);

app.listen(port, (): void => {
    console.log(`App listening on port ${port}!`);
});
