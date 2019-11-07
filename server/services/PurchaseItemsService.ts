import IPurchaseItemsService from "./interfaces/PurchaseItemsService";
import IMapHelper from "../common/interfaces/MapHelper";
import PurchaseItem from "../models/PurchanseItem";
import IAirtableService from "./interfaces/AirtableService";
import * as Moment from "moment";
import InsertPurchaseItemsRequest from "../models/requests/InsertPurchaseItemsRequest";
import GetPurchaseItemsRequest from "../models/requests/GetPurchaseItemsRequest";

class PurchaseItemsService implements IPurchaseItemsService {
    private airtableService: IAirtableService;
    private mapHelper: IMapHelper;

    public constructor(
        airtableService: IAirtableService,
        mapHelper: IMapHelper
    ) {
        this.airtableService = airtableService;
        this.mapHelper = mapHelper;
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
                                            this.mapHelper.mapAirtableRecToPurchaseItem(
                                                record
                                            )
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
                                this.mapHelper.mapAirtableRecToPurchaseItem(
                                    record
                                )
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
            const inserReq = this.mapHelper.mapRequestToPurchaseItem(
                request.purchaseItems
            );

            await this.airtableService.insertPurchaseItems(inserReq);
        } catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default PurchaseItemsService;
