import IPaymentLogService from "./interfaces/PaymentLogService";
import IAirtableService, { AirtableRequest } from "./interfaces/AirtableService";
import AirtableService from "./AirtableService";
import PaymentLog from "../models/PaymentLog";

class PaymentLogService implements IPaymentLogService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
    }

    public getPaymetLogs(request: AirtableRequest, page?: number): Promise<PaymentLog[]> {
        let toReturn = [];

        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                const response = await this.airtableService.getPaymentLog(request);

                if (!response) {
                    resolve(toReturn);
                }

                if (page) {
                    if (page <= 0) {
                        resolve(toReturn);
                    }

                    response.eachPage((records: any, fetchNextPage: any): void => {
                        while (--page > 0) {
                            fetchNextPage();
                            return;
                        }

                        if (page === 0) {
                            toReturn = records.map((record: any): PaymentLog => this.mapPaymentLog(record));
                            resolve(toReturn);
                        }
                    }, (): void => resolve(toReturn));
                }
                else {
                    const records = await response.all();

                    toReturn = records.map((record: any): PaymentLog => this.mapPaymentLog(record));
                    resolve(toReturn);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private mapPaymentLog(record: any): PaymentLog {
        try {
            const toReturn = {
                purchaseId: record.fields["Purchase Request ID"]
            };

            return toReturn as PaymentLog;
        }
        catch (err) {
            console.log(err);

            throw err;
        }
    }

}

export default PaymentLogService;