import { AirtableFetchRequest } from "./AirtableService";
import PurchaseItem from "../../models/PurchanseItem";

interface PurchaseItemsService {
    getPurchaseItems(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PurchaseItem[]>;
    insertPurchaseItems(request: PurchaseItem[]): Promise<boolean>;
}

export default PurchaseItemsService;
