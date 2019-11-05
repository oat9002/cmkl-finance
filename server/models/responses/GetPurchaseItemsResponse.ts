import Response from "./Response";
import PurchaseItem from "../PurchanseItem";

interface GetPurchaseItemsResponse extends Response {
    purchaseItems: PurchaseItem[];
}

export default GetPurchaseItemsResponse;
