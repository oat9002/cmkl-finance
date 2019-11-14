export default interface AirtableFetchRequest {
    fields?: string[];
    filterByFormula?: string;
    maxRecords?: number;
    pageSize?: number;
    sort?: Sort;
}

type Sort = "desc" | "asc";
