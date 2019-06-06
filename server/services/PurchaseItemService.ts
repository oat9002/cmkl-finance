import IPurchaseItemService from "./interfaces/PurchaseItemService";
import { AirtableRequest } from "./interfaces/AirtableService";
import PurchaseItem from "../models/PurchanseItem";
import AirtableService from "./AirtableService";
import IAirtableService from "./interfaces/AirtableService";

class PurchaseItemService implements IPurchaseItemService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
    }

    public getPurchaseItems(request: AirtableRequest, page?: number): Promise<PurchaseItem[]> {
        let toReturn = [];

        return new Promise(async (resolve, reject): Promise<void> => {
            try {
                const response = await this.airtableService.getPurchaseItems(request);

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
                            toReturn = records.map((record: any): PurchaseItem => this.mapPurchaseItem(record));
                            resolve(toReturn);
                        }
                    }, (): void => resolve(toReturn));
                }
                else {
                    const records = await response.all();

                    toReturn = records.map((record: any): PurchaseItem => this.mapPurchaseItem(record));
                    resolve(toReturn);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }

    private mapPurchaseItem(record: any): PurchaseItem {
        try {
            const toReturn = {
                purchaseId: record.fields["Purchase ID"]
            };

            return toReturn as PurchaseItem;
        }
        catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default PurchaseItemService;