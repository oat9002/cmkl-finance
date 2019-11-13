import { httpStatus } from "./../../../server/common/Constants";
import axios from "../utils/Axios";
import PurchaseItem from "../models/PurchanseItem";
import { AxiosResponse } from "axios";
import GetPurchaseItemsResponse from "../models/responses/GetPurchaseItemsResponse";

const piAxios = axios("purchaseItems");

export async function getPurchaseItems(
    recordCount: number
): Promise<PurchaseItem[]> {
    try {
        const response: AxiosResponse<
            GetPurchaseItemsResponse
        > = await piAxios.post("getPurchaseItems", {
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

export async function insertPurchaseItems() {}
