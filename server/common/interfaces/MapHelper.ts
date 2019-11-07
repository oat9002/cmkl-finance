import PurchaseItem from "../../models/PurchanseItem";

import { AirtableInsertRequest } from "../../services/interfaces/AirtableService";

interface MapHelper {
    mapAirtableRecToPurchaseItem(record: any): PurchaseItem;
    mapRequestToPurchaseItem(
        request: PurchaseItem[]
    ): AirtableInsertRequest<PurchaseItem>[];
}

export default MapHelper;
