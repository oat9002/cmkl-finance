import IAirtableService, { AirtableRequest, AirtableResponse } from "./interfaces/AirtableService";
import IServiceConnector from "./interfaces/ServiceConnector";
import ServiceConnector from "./ServiceConnector";

class AirtableService implements IAirtableService {
    private airtable: any;

    public constructor() {
        const serviceConnector: IServiceConnector = new ServiceConnector();

        this.airtable = serviceConnector.getAirtable();
    }

    public getPaymentLog(request: AirtableRequest): Promise<AirtableResponse> {
        return this.airtable("Payment Log").select(request);
    }

    public getPurchaseItems(request: AirtableRequest): Promise<AirtableResponse> {
        return this.airtable("Purchase Items").select(request);
    }

    public getPurchaseRequisition(request: AirtableRequest): Promise<AirtableResponse> {
        return this.airtable("Purchase Requisition").select(request);
    }
}

export default AirtableService;