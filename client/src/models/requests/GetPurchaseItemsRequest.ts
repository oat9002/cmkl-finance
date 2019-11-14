import AirtableFetchRequest from "./AirtableFetchRequest";

export default interface GetPurchaseItemsRequest {
    option: AirtableFetchRequest;
    page?: number;
}
