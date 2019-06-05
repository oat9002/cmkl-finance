interface AirtableService {
    getPaymentLog(request: AirtableRequest): any;
    getPurchaseItems(request: AirtableRequest): any;
    getPurchaseRequisition(request: AirtableRequest): any;
}

interface AirtableRequest {
    fields?: string[];
    filterByFormula?: string;
    maxRecords?: number;
    pageSize?: number;
    sort?: Sort;
}

type Sort = "asc" | "asc";

export { AirtableService, AirtableRequest };
export default AirtableService;