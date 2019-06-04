import ServiceConnector from './ServiceConnector';

class ReportService {
    private airtable: any;

    public constructor() {
        const serviceConnector = new ServiceConnector();

        this.airtable = serviceConnector.getAirTable();
    }

    public async getPaymentLogDetails(): Promise<void> {
        const paymentLogs = this.airtable('Payment Log').select().all();

    }
}

export default ReportService;
