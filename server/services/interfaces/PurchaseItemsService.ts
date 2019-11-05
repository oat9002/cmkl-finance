import PurchaseItem from "../../models/PurchanseItem";
import InsertPurchaseItemsRequest from "../../models/requests/InsertPurchaseItemsRequest";
import GetPurchaseItemsRequest from "../../models/requests/GetPurchaseItemsRequest";

interface PurchaseItemsService {
    getPurchaseItems(request: GetPurchaseItemsRequest): Promise<PurchaseItem[]>;
    insertPurchaseItems(request: InsertPurchaseItemsRequest): Promise<void>;
}

export default PurchaseItemsService;
