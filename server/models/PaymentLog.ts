interface PaymentLog {
    paymentId: string;
    psId: string;
    psForm: string;
    void: string;
    paymentControlId: string;
    paymentPeriod: Date;
    paymentPeriodItemId: string;
    purchaseId: string;
    expenseLog: string;
    payroll: string;
    paymentDate: Date;
    calculatedPayroll: number;
    calculatedPurchaseAmount: number;
    calculatedPurchaseWithholding: number;
    calculatedExpenseAmount: number;
    expectedPaidAmount: number;
    difference: number;
    paidAmount: number;
    withholdingAmount: number;
    bankFee: number;
    bankWithdrawAmount: number;
    paymentType: PaymentType;
    cheque: string;
    proofOfPayment: string;
    withholdingForm: string;
    checkId: string;
    txChequeId: string;
    bankBatchRefNo: string;
    bankRefNo: string;
    bankTransaction: string;
    paidTo: string;
    expectedPayee: string;
    enteredby: string;
    verifiedby: string;
    notes: string;
    createdTime: Date;
    batchPayments: string;
    fiscalYear: string;
}

type PaymentType = "Direct Credit (DCT)";

export default PaymentLog;