import PurchaseRequisition from "../../models/PurchaseRequisition";
import { AirtableRequest } from "./AirtableService";

interface PurchaseRequisitionService {
    getPurchaseRequsition(request: AirtableRequest, page?: number): Promise<PurchaseRequisition[]>;
}

export default PurchaseRequisitionService;
