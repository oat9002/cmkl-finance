import AirtableUser from "../AirtableUser";

export default interface InsertPurchaseItemsRequest {
    shortDescription: string;
    missingReceipt?: boolean;
    paymentDueDate: Date;
    usdInvoiceAmount?: number;
    thbInvoiceAmount?: number;
    paymentAmount: number;
    requestJustification: string;
    enteredBy: AirtableUser;
    accountPayable: string;
    supplier?: string;
    reviewedBy: AirtableUser;
}
