import axios from "../commons/Axios";
import PurchaseItem from "../models/PurchanseItem";
import { AxiosResponse } from "axios";
import GetPurchaseItemsResponse from "../models/responses/GetPurchaseItemsResponse";
import { httpStatus } from "../commons/Constants";
import GetPurchaseItemsRequest from "../models/requests/GetPurchaseItemsRequest";
import InsertPurchaseItemsRequest from "../models/requests/InsertPurchaseItemsRequest";
import InsertPurchaseItemResponse from "../models/responses/InsertPurchaseItemsResponse";

const piAxios = axios("purchaseItems");

export async function getPurchaseItems(
    request: GetPurchaseItemsRequest
): Promise<PurchaseItem[]> {
    try {
        const response: AxiosResponse<GetPurchaseItemsResponse> = await piAxios.post(
            "getPurchaseItems",
            request
        );

        if (response && response.status !== httpStatus.okay) {
            return [];
        }

        return response.data.purchaseItems;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export async function insertPurchaseItems(request: InsertPurchaseItemsRequest) {
    try {
        const response: AxiosResponse<InsertPurchaseItemResponse> = await piAxios.post(
            "insertPurchaseItems",
            request
        );

        if (response && response.status !== httpStatus.okay) {
            return false;
        }

        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}
