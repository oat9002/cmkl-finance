import { AirtableFetchRequest } from "../../services/interfaces/AirtableService";

interface GetPurchaseItemsRequest {
    option: AirtableFetchRequest;
    page?: number;
}

export default GetPurchaseItemsRequest;
