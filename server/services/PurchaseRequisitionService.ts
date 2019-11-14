import IPurchaseRequisitionService from "./interfaces/PurchaseRequisitionService";
import PurchaseRequisition from "../models/PurchaseRequisition";
import IMapHelper from "../common/interfaces/MapHelper";
import IAirtableService, {
    AirtableFetchRequest
} from "./interfaces/AirtableService";
import * as Moment from "moment";

class PurchaseRequisitionService implements IPurchaseRequisitionService {
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

    public async getPurchaseRequsition(
        request: AirtableFetchRequest,
        page?: number
    ): Promise<PurchaseRequisition[]> {
        let toReturn = [];

        return new Promise(
            async (resolve, reject): Promise<void> => {
                try {
                    const response = await this.airtableService.getPurchaseRequisition(
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
                                        (record: any): PurchaseRequisition =>
                                            this.mapHelper.mapAirtableRecToPurchaseRequisition(
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
                            (record: any): PurchaseRequisition =>
                                this.mapHelper.mapAirtableRecToPurchaseRequisition(
                                    record
                                )
                        );
                        resolve(toReturn);
                    }
                } catch (err) {
                    reject(err);
                }
            }
        );
    }
}

export default PurchaseRequisitionService;
