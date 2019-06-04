interface AirtableService {
    getPaymentLog(request: AirtableRequest): Promise<AirtableResponse>;
    getPurchaseItems(request: AirtableRequest): Promise<AirtableResponse>;
    getPurchaseRequisition(request: AirtableRequest): Promise<AirtableResponse>;
}

interface AirtableRequest {
    fields?: string[];
    filterByFormula?: string;
    maxRecords?: number;
    pageSize?: number;
    sort?: Sort;
}

interface AirtableResponse {
    records: any;
    fetchNextPage(): any;
}

type Sort = "asc" | "asc";

export { AirtableService, AirtableRequest, AirtableResponse };
export default AirtableService;