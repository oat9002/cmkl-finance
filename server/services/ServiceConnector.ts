import * as dotenv from 'dotenv';
const Airtable = require('airtable');

class ServiceConnector {
    public constructor() {
        dotenv.config();
    }

    public getAirTable(): any {
        const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
        return airtable.base(process.env.AIRTABLE_APP_ID);
    }
}

export default ServiceConnector;
