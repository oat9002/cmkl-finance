import PurchaseItem from "../../models/PurchanseItem";

interface AirtableService {
    getPaymentLog(request: AirtableFetchRequest): any;
    getPurchaseItems(request: AirtableFetchRequest): any;
    getPurchaseRequisition(request: AirtableFetchRequest): any;
    insertPurchaseItems(request: AirtableInsertRequest<PurchaseItem>): any;
}

interface AirtableFetchRequest {
    fields?: string[];
    filterByFormula?: string;
    maxRecords?: number;
    pageSize?: number;
    sort?: Sort;
}

interface AirtableInsertRequest<T> {
    fileds: T[];
}

type Sort = "asc" | "asc";

export { AirtableService, AirtableFetchRequest, AirtableInsertRequest };
export default AirtableService;
