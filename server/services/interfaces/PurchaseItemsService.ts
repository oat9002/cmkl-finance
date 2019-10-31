import { AirtableFetchRequest, AirtableInsertRequest } from "./AirtableService";
import PurchaseItem from "../../models/PurchanseItem";

interface PurchaseItemsService {
    getPurchaseItems(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PurchaseItem[]>;
    insertPurchaseItems(
        request: AirtableInsertRequest<PurchaseItem>
    ): Promise<boolean>;
}

export default PurchaseItemsService;
