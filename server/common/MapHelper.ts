import * as Moment from "moment";
import { AirtableInsertRequest } from "../services/interfaces/AirtableService";
import PurchaseItem from "../models/PurchanseItem";
import MapHelper from "./interfaces/MapHelper";
import PurchaseRequisition from "../models/PurchaseRequisition";
import InsertPurchaseItemsRequest from "../models/requests/InsertPurchaseItemsRequest";
import { getOrElse } from "./Utils";

class MapHelperImpl implements MapHelper {
    public mapAirtableRecToPurchaseItem(record: any): PurchaseItem {
        try {
            const toReturn = {
                purchaseId: getOrElse(record.fields["Purchase ID"]),
                shortDescription: getOrElse(record.fields["Short Description"]),
                paymentDueDate: getOrElse(
                    Moment(
                        record.fields["Payment Due Date"],
                        "D MMMM YYYY"
                    ).toDate()
                ),
                account: getOrElse(record.fields["Account"]),
                usdInvoiceAmount: getOrElse(
                    record.fields["USD Invoice Amount"]
                ),
                thbInvoiceAmount: getOrElse(
                    record.fields["THB Invoice Amount"]
                ),
                paymentAmount: getOrElse(record.fields["Payment Amount"]),
                requestJustification: getOrElse(
                    record.fields["Request Justification"]
                ),
                enteredBy: getOrElse(record.fields["Entered By"]),
                accountPayable: getOrElse(record.fields["Account Payable"]),
                supplier: getOrElse(record.fields["Supplier"])
            };

            return toReturn as PurchaseItem;
        } catch (err) {
            throw err;
        }
    }

    public mapRequestToPurchaseItem(
        request: InsertPurchaseItemsRequest
    ): AirtableInsertRequest<PurchaseItem> {
        try {
            const pi = {};
            pi["Short Description"] = request.shortDescription;
            //toReturn["Purchase ID"] = request.purchaseId;
            //missing
            pi["Payment Due Date"] = request.paymentDueDate;
            pi["USD Invoice Amount"] = request.usdInvoiceAmount;
            pi["THB Invoice Amount"] = request.thbInvoiceAmount;
            pi["Payment Amount"] = request.paymentAmount;
            pi["Request Justification"] = request.requestJustification;
            pi["Entered By"] = request.enteredBy;
            pi["Account Payable"] = request.accountPayable;
            pi["Supplier"] = request.supplier;
            pi["Reviewed By"] = request.reviewedBy;
            pi["Created Time"] = Moment(
                Moment.now(),
                "D MMMM YYYY h:mma"
            ).toString();

            const toReturn = {
                fields: pi
            };

            return toReturn as AirtableInsertRequest<PurchaseItem>;
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

export default MapHelperImpl;
