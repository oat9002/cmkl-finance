import IPurchaseRequisitionService from "./interfaces/PurchaseRequisitionService";
import PurchaseRequisition from "../models/PurchaseRequisition";
import IAirtableService, { AirtableRequest } from "./interfaces/AirtableService";
import AirtableService from "./AirtableService";


class PurchaseRequisitionService implements IPurchaseRequisitionService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
    }

    public async getPurchaseRequsition(request: AirtableRequest, page?: number): Promise<PurchaseRequisition[]> {
        const toReturn = [];

        return new Promise(async (resolve, reject): void => {
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
                            records.forEach((record: any): void => {
                                toReturn.push(this.mapPurchaseRequisiontion(record));
                            });

                            resolve(toReturn);
                        }
                    }, (): void => resolve(toReturn));
                }
                else {
                    const records = await response.all();
                    records.forEach((record: any): void => {
                        toReturn.push(this.mapPurchaseRequisiontion(record));
                    });

                    resolve(toReturn);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private mapPurchaseRequisiontion(record: any): PurchaseRequisition {
        try {
            const toReturn: PurchaseRequisition = {
                purchaseRequisitionId: record.fields["Purchase Request ID"]
            };

            return toReturn;
        }
        catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default PurchaseRequisitionService;