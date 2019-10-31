import { AirtableFetchRequest } from "./AirtableService";
import PaymentLog from "../../models/PaymentLog";

interface PaymentLogService {
    getPaymetLogs(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PaymentLog[]>;
}

export default PaymentLogService;
