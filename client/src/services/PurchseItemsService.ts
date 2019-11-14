import axios from "../commons/Axios";
import PurchaseItem from "../models/PurchanseItem";
import { AxiosResponse } from "axios";
import GetPurchaseItemsResponse from "../models/responses/GetPurchaseItemsResponse";
import { httpStatus } from "../commons/Constants";

const piAxios = axios("purchaseItems");

export async function getPurchaseItems(
    recordCount: number
): Promise<PurchaseItem[]> {
    try {
        const response: AxiosResponse<GetPurchaseItemsResponse> = await piAxios.post(
            "getPurchaseItems",
            {
                option: {
                    maxRecords: recordCount
                }
            }
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
