import IPurchaseItemsService from "./interfaces/PurchaseItemsService";
import { AirtableFetchRequest } from "./interfaces/AirtableService";
import PurchaseItem from "../models/PurchanseItem";
import AirtableService from "./AirtableService";
import IAirtableService from "./interfaces/AirtableService";
import * as Moment from "moment";

class PurchaseItemsService implements IPurchaseItemsService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
        Moment.locale("th");
    }

    public getPurchaseItems(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PurchaseItem[]> {
        let toReturn = [];

        return new Promise(
            async (resolve, reject): Promise<void> => {
                try {
                    const response = await this.airtableService.getPurchaseItems(
                        request
                    );

                    if (!response) {
                        resolve(toReturn);
                    }

                    if (page) {
                        if (page <= 0) {
                            resolve(toReturn);
                        }

                        response.eachPage(
                            (records: any, fetchNextPage: any): void => {
                                while (--page > 0) {
                                    fetchNextPage();
                                    return;
                                }

                                if (page === 0) {
                                    toReturn = records.map(
                                        (record: any): PurchaseItem =>
                                            this.mapPurchaseItem(record)
                                    );
                                    resolve(toReturn);
                                }
                            },
                            (): void => resolve(toReturn)
                        );
                    } else {
                        const records = await response.all();

                        toReturn = records.map(
                            (record: any): PurchaseItem =>
                                this.mapPurchaseItem(record)
                        );
                        resolve(toReturn);
                    }
                } catch (err) {
                    console.log(err);
                    reject(err);
                }
            }
        );
    }

    public insertPurchaseItems(
        request: AirtableFetchRequest<PurchaseItem>
    ): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    private mapPurchaseItem(record: any): PurchaseItem {
        try {
            const toReturn = {
                purchaseId: record.fields["Purchase ID"],
                paymentDueDate: Moment(
                    record.fields["Payment Due Date"],
                    "D MMMM YYYY"
                ).toDate(),
                account: record.fields["Account"],
                thbInvoiceAmount: record.fields["THB Invoice Amount"],
                category: record.fields["Category"],
                enteredBy: record.fields["Entered By"],
                requestBy: record.fields["Request By"],
                createdTime: Moment(
                    record.fields["Created Time"],
                    "D MMMM YYYY h:mma"
                ).toDate()
            };

            return toReturn as PurchaseItem;
        } catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default PurchaseItemsService;
