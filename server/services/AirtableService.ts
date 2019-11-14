import IAirtableService, {
    AirtableFetchRequest,
    AirtableInsertRequest
} from "./interfaces/AirtableService";
import IServiceConnector from "./interfaces/ServiceConnector";
import ServiceConnector from "./ServiceConnector";
import PurchaseItem from "../models/PurchanseItem";

class AirtableService implements IAirtableService {
    private airtable: any;

    public constructor() {
        const serviceConnector: IServiceConnector = new ServiceConnector();

        this.airtable = serviceConnector.getAirtable();
    }

    public getPaymentLog(request: AirtableFetchRequest): any {
        return this.airtable("Payment Log").select(request);
    }

    public getPurchaseItems(request: AirtableFetchRequest): any {
        return this.airtable("Purchase Items").select(request);
    }

    public getPurchaseRequisition(request: AirtableFetchRequest): any {
        return this.airtable("Purchase Requisition").select(request);
    }

    public insertPurchaseItems(
        request: AirtableInsertRequest<PurchaseItem>[]
    ): any {
        return this.airtable("Purchase Items").create(request);
    }
}

export default AirtableService;
