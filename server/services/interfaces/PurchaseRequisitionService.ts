import PurchaseRequisition from "../../models/PurchaseRequisition";

interface PurchaseRequisitionService {
    getPurchaseRequsition(): { purchaseRequisitions: PurchaseRequisition[]; fetchNextPage: () => PurchaseRequisition[] };
}

export default PurchaseRequisitionService;
