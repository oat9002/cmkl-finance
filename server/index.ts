import * as express from 'express';
import ReportService from './services/report/ReportService';

// Create a new express application instance
const app = express();
const port = 3000;
const reportService = new ReportService();

app.get('/', (req, res): void => {
    res.send('Hello World!');
});

app.get('/GetPaymentLogDetails', (req, res): void => {
    reportService.getPaymentLogDetails();
    res.send('GetPaymentLogDetails');
});

app.listen(port, (): void => {
    console.log(`App listening on port ${port}!`);
}); 