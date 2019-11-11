import PurchaseItem from "../../models/PurchanseItem";
import { AirtableInsertRequest } from "../../services/interfaces/AirtableService";
import PurchaseRequisition from "../../models/PurchaseRequisition";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";

interface MapHelper {
    mapAirtableRecToPurchaseItem(record: any): PurchaseItem;
    mapRequestToPurchaseItem(
        request: InsertPurchaseItemsRequest
    ): AirtableInsertRequest<PurchaseItem>;
    mapAirtableRecToPurchaseRequisition(record: any): PurchaseRequisition;
}

export default MapHelper;
