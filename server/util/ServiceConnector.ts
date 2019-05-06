import * as Airtable from 'airtable';
import * as dotenv from 'dotenv';

class ServiceConnector {
    public constructor() {
        dotenv.config();
    }

    public getAirTable(): Airtable.Base {
        const airtable = new Airtable();
        return airtable.base(process.env.AIRTABLE_APP_ID);
    }
}

export default ServiceConnector;
