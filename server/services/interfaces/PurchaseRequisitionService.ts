import PurchaseRequisition from "../../models/PurchaseRequisition";
import { AirtableFetchRequest } from "./AirtableService";

interface PurchaseRequisitionService {
    getPurchaseRequsition(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PurchaseRequisition[]>;
}

export default PurchaseRequisitionService;
