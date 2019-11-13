import { httpStatus } from "./../../../server/common/Constants";
import axios from "../utils/Axios";

const piAxios = axios("purchaseItems");

export async function getPurchaseItems(recordCount: number) {
    try {
        const response = await piAxios.post("getPurchaseItems", {
            maxRecords: recordCount
        });

        if (response && response.status !== httpStatus.okay) {
            return [];
        }

        return response.data.purchaseItems;
    } catch (err) {
        return [];
    }
}
