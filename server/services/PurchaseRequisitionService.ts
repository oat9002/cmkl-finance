import IPurchaseRequisitionService from "./interfaces/PurchaseRequisitionService";
import PurchaseRequisition from "../models/PurchaseRequisition";

class PurchaseRequisitionService implements IPurchaseRequisitionService {
    public getPurchaseRequsition(): { purchaseRequisitions: PurchaseRequisition[]; fetchNextPage: () => PurchaseRequisition[] } {
        throw new Error("Method not implemented.");
    }
}

export default PurchaseRequisitionService;