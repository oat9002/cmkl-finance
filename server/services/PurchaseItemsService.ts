import IPurchaseItemsService from "./interfaces/PurchaseItemsService";
import { AirtableInsertRequest } from "./interfaces/AirtableService";
import PurchaseItem from "../models/PurchanseItem";
import AirtableService from "./AirtableService";
import IAirtableService from "./interfaces/AirtableService";
import * as Moment from "moment";
import InsertPurchaseItemsRequest from "../models/requests/InsertPurchaseItemsRequest";
import GetPurchaseItemsRequest from "../models/requests/GetPurchaseItemsRequest";

class PurchaseItemsService implements IPurchaseItemsService {
    private airtableService: IAirtableService;

    public constructor() {
        this.airtableService = new AirtableService();
        Moment.locale("th");
    }

    public async getPurchaseItems(
        request: GetPurchaseItemsRequest
    ): Promise<PurchaseItem[]> {
        let toReturn = [];
        let page = request.page;

        return new Promise(
            async (resolve, reject): Promise<void> => {
                try {
                    const response = await this.airtableService.getPurchaseItems(
                        request.option
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

    public async insertPurchaseItems(
        request: InsertPurchaseItemsRequest
    ): Promise<void> {
        try {
            const inserReq = this.mapRequestInsertPurchaseItem(
                request.purchaseItems
            );

            await this.airtableService.insertPurchaseItems(inserReq);
        } catch (err) {
            console.log(err);

            throw err;
        }
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
            throw err;
        }
    }

    private mapRequestInsertPurchaseItem(
        request: PurchaseItem[]
    ): AirtableInsertRequest<PurchaseItem>[] {
        try {
            return request.map(x => {
                const toReturn = {};
                toReturn["Purchase ID"] = x.purchaseId;
                toReturn["Payment Due Date"] = x.paymentDueDate;
                toReturn["Account"] = x.account;
                toReturn["THB Invoice Amount"] = x.thbInvoiceAmount;
                toReturn["Category"] = x.category;
                toReturn["Entered By"] = x.enteredBy;
                toReturn["Request By"] = x.requestBy;
                toReturn["Created Time"] = Moment(
                    Moment.now(),
                    "D MMMM YYYY h:mma"
                ).toString();

                return {
                    fields: toReturn
                };
            }) as AirtableInsertRequest<PurchaseItem>[];
        } catch (err) {
            throw err;
        }
    }
}

export default PurchaseItemsService;
