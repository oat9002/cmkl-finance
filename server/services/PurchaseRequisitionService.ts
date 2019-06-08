import IPurchaseRequisitionService from "./interfaces/PurchaseRequisitionService";
import PurchaseRequisition from "../models/PurchaseRequisition";
import IAirtableService, { AirtableRequest } from "./interfaces/AirtableService";
import AirtableService from "./AirtableService";
import * as Moment from "moment";

class PurchaseRequisitionService implements IPurchaseRequisitionService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
        Moment.locale("th");
    }

    public async getPurchaseRequsition(request: AirtableRequest, page?: number): Promise<PurchaseRequisition[]> {
        let toReturn = [];

        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                const response = await this.airtableService.getPurchaseRequisition(request);

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
                            toReturn = records.map((record: any): PurchaseRequisition => this.mapPurchaseRequisition(record));
                            resolve(toReturn);
                        }
                    }, (): void => resolve(toReturn));
                }
                else {
                    const records = await response.all();

                    toReturn = records.map((record: any): PurchaseRequisition => this.mapPurchaseRequisition(record));
                    resolve(toReturn);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private mapPurchaseRequisition(record: any): PurchaseRequisition {
        try {
            const toReturn = {
                purchaseRequisitionId: record.fields["Purchase Request ID"],
                request: record.fields["Request"],
                reasonsForRequest: record.fields["Resons for request"],
                urgency: record.fields["Urgency"],
                createdTime: Moment(record.fields["Created Time"], "D MMMM YYYY h:mma").toDate(),
                thbQuoteAmount: record.fields["THB Quote Amount"],
                paymentDue: Moment(record.fields["Payment Due"], "YYYY/MM/D").toDate(),
                paymentType: record.fields["payment Type"],
                enteredBy: record.fields["Entered By"],
                requestBy: record.fields["Request By"]
            };

            return toReturn as PurchaseRequisition;
        }
        catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default PurchaseRequisitionService;