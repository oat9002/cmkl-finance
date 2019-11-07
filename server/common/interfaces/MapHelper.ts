import PurchaseItem from "../../models/PurchanseItem";
import { AirtableInsertRequest } from "../../services/interfaces/AirtableService";
import PurchaseRequisition from "../../models/PurchaseRequisition";

interface MapHelper {
    mapAirtableRecToPurchaseItem(record: any): PurchaseItem;
    mapRequestToPurchaseItem(
        request: PurchaseItem[]
    ): AirtableInsertRequest<PurchaseItem>[];
    mapAirtableRecToPurchaseRequisition(record: any): PurchaseRequisition;
}

export default MapHelper;
