import ServiceConnector from '../util/ServiceConnector';

class ReportService {
    private airtable: Airtable.Base;

    public constructor() {
        const serviceConnector = new ServiceConnector();

        this.airtable = serviceConnector.getAirTable();
    }

    public getPaymentLogDetails(): void {
        this.airtable('Payment Log').select({ view: 'Grid view' }).firstPage().then((res): void => console.log(res[0])).catch((err: Error): void => console.log(err));
        // this.airtable.prototype.find('rec1UFk6IypoWbRAj', (err, record): void => {
        //     if (err) { console.error(err); return; }
        //     console.log(record);
        // });
    }
}

export default ReportService;
