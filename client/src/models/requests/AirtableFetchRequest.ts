export default interface AirtableFetchRequest {
    fields?: string[];
    filterByFormula?: string;
    maxRecords?: number;
    pageSize?: number;
    sort?: Sort[];
}

interface Sort {
    field: string;
    direction: "desc" | "asc";
}
