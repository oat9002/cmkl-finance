import PurchaseItem from "../../models/PurchanseItem";
import Moment from "moment";

export function mapPurchaseItemsToDataTable(data: PurchaseItem[]) {
    if (data && data.length === 0) {
        return [];
    }

    Moment.locale("th");

    return data.map(x => {
        return {
            ...x,
            paymentDueDate: Moment(x.paymentDueDate).format("DD/MM/YYYY"),
            enteredBy: x.enteredBy.name || null
        };
    });
}
