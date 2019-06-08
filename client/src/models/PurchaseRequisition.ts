import AirtableUser from "./AirtableUser";

export default interface PurchaseRequisition {
    purchaseRequisitionId: string;
    account: string[];
    type: PurchaseRequisitionType;
    request: string;
    reasonsForRequest: string;
    urgency: Urgency;
    createdTime: Date;
    reviewStatus: ReviewStatus;
    thbQuoteAmount: number;
    usdQuoteAmount: number;
    bestQuoteVendor: string[];
    supportingDocument: object[];
    paymentDue: Date;
    paymentType: PaymentType;
    enteredBy: AirtableUser;
    requestBy: AirtableUser;
    accountManager: AirtableUser;
    reviewedBy: AirtableUser;
    approvedBy: AirtableUser;
    approvalNote: string;
    paperDocumentId: string;
    purchaseItem: object;
    expenseLog: object;
    period: Date;
}

type PurchaseRequisitionType = "Information & Data" | "Event Organizer" | "Gift and Souvenir" | "Training" | "Venue and Catering" | "Public Relation" | "Software" | "Office Supplies" | "Professional Services" | "Software Service Subscription" | "Materials" | "Professional Development" | "Travel" | "Publication";

export type Urgency = "Low Urgency" | "Medium Urgency" | "Top Urgency" | "Mission Critical";

type ReviewStatus = "RFQ Complete" | "Purchased" | "Completed" | "Verified" | "Needs Review" | "Best Quote Selected" | "Approved" | "Payment Sent / Reimbursed" | "Void" | "Purchasing"

type PaymentType = "Purchasing Card" | "Cheque" | "Expense" | "Direct Transfer" | "Travel Advance / Direct Transfer"
