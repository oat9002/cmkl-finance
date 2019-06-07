import { AirtableRequest } from "./AirtableService";
import PurchaseItem from "../../models/PurchanseItem";

interface PurchaseItemsService {
    getPurchaseItems(request: AirtableRequest, page?: number): Promise<PurchaseItem[]>;
}

export default PurchaseItemsService;