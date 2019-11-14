import Response from "./Response";
import PurchaseItem from "../PurchanseItem";

export default interface GetPurchaseItemsResponse extends Response {
    purchaseItems: PurchaseItem[];
}
