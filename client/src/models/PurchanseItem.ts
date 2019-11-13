import AirtableUser from "./AirtableUser";

export default interface PurchaseItem {
    shortDescription: string;
    docId: string;
    purchaseId: string;
    requisitionId: string;
    paid: boolean;
    void: boolean;
    paymentDueDate: Date;
    account: string;
    quotation: string;
    invoice: string;
    receipt: string;
    itemPhoto: string;
    deliveryDateTime: Date;
    usdInvoiceAmount: string;
    thbInvoiceAmount: string;
    paymentAmount: string;
    requestJustification: string;
    category: Category;
    enteredBy: AirtableUser;
    requestBy: AirtableUser;
    accountManager: AirtableUser;
    reviewedBy: AirtableUser;
    accountantVerifiedBy: AirtableUser;
    approvedBy: AirtableUser;
    paymentMethod: PaymentMethod;
    approvalStatus: ApprovalStatus;
    approvalNote: string;
    accountingDate: string;
    payment: string;
    accountPayable: string;
    supplier: string;
    relatedPurchases: string;
    createdTime: Date;
    paymentPeriod: Date;
    project: string;
    taxWithholdingAmount: string;
    requisitionApprovedBy: AirtableUser;
    requisitionReviewedBy: AirtableUser;
    needAudit: boolean;
    CancelOrRefund: boolean;
    refundReceivableItems: string;
    fiscalYear: string;
    inventory: string;
    advancedClearingReceivableItems: string;
    reimburseItemReceivableItems: string;
    auditedBy: string;
}

type Category = "Services" | "Hotel and Accommodation" | "Travel";
type PaymentMethod =
    | "Employee Advance"
    | "Travel Advance Clearing (accounting only/no payment)";
type ApprovalStatus = "Paid";
