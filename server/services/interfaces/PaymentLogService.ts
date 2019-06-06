import { AirtableRequest } from "./AirtableService";
import PaymentLog from "../../models/PaymentLog";

interface PaymentLogService {
    getPaymetLogs(request: AirtableRequest, page?: number): Promise<PaymentLog[]>;
}

export default PaymentLogService;
