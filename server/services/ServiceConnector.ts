import * as dotenv from 'dotenv';
import IServiceConnector from './interfaces/ServiceConnector'

const Airtable = require('airtable');

class ServiceConnector implements IServiceConnector {
    public constructor() {
        dotenv.config();
    }

    public getAirtable(): any {
        const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY });
        return airtable.base(process.env.AIRTABLE_APP_ID);
    }

    public getFirebase(): any {
        throw new Error("Method not implemented.");
    }
}

export default ServiceConnector;
