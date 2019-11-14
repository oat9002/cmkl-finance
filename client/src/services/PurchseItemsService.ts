import axios from "../commons/Axios";
import PurchaseItem from "../models/PurchanseItem";
import { AxiosResponse } from "axios";
import GetPurchaseItemsResponse from "../models/responses/GetPurchaseItemsResponse";
import { httpStatus } from "../commons/Constants";
import GetPurchaseItemsRequest from "../models/requests/GetPurchaseItemsRequest";

const piAxios = axios("purchaseItems");

export async function getPurchaseItems(
    recordCount: number
): Promise<PurchaseItem[]> {
    try {
        const request: GetPurchaseItemsRequest = {
            option: {
                maxRecords: 10,
                sort: [{ field: "Purchase ID", direction: "asc" }]
            }
        };
        const response: AxiosResponse<GetPurchaseItemsResponse> = await piAxios.post(
            "getPurchaseItems",
            request
        );

        if (response && response.status !== httpStatus.okay) {
            return [];
        }

        return response.data.purchaseItems;
    } catch (err) {
        return [];
    }
}

export async function insertPurchaseItems() {}
