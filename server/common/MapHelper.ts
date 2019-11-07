import * as Moment from "moment";
import { AirtableInsertRequest } from "../services/interfaces/AirtableService";
import PurchaseItem from "../models/PurchanseItem";
import IMapHelper from "./interfaces/MapHelper";
import PurchaseRequisition from "../models/PurchaseRequisition";

class MapHelper implements IMapHelper {
    public mapAirtableRecToPurchaseItem(record: any): PurchaseItem {
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

    public mapRequestToPurchaseItem(
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

    public mapAirtableRecToPurchaseRequisition(
        record: any
    ): PurchaseRequisition {
        try {
            const toReturn = {
                purchaseRequisitionId: record.fields["Purchase Request ID"],
                request: record.fields["Request"],
                reasonsForRequest: record.fields["Resons for request"],
                urgency: record.fields["Urgency"],
                createdTime: Moment(
                    record.fields["Created Time"],
                    "D MMMM YYYY h:mma"
                ).toDate(),
                thbQuoteAmount: record.fields["THB Quote Amount"],
                paymentDue: Moment(
                    record.fields["Payment Due"],
                    "YYYY/MM/D"
                ).toDate(),
                paymentType: record.fields["payment Type"],
                enteredBy: record.fields["Entered By"],
                requestBy: record.fields["Request By"]
            };

            return toReturn as PurchaseRequisition;
        } catch (err) {
            console.log(err);

            throw err;
        }
    }
}

export default MapHelper;
