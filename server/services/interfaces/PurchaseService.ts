import { AirtableRequest } from "./AirtableService";
import PurchaseItem from "../../models/PurchanseItem";

interface PurchaseService {
    getPurchaseItems(request: AirtableRequest, page?: number): Promise<PurchaseItem[]>;
}

export default PurchaseService;