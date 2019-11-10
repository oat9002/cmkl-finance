import IRequestValidator from "./interfaces/RequestValidator";
import { Response, Request } from "express";
import { httpStatus } from "../common/Constants";

class RequestValidator implements IRequestValidator {
    public validate(req: Request, res: Response, next: any): void {
        if (!req.headers || req.headers["x-auth"] !== "cmklFinance") {
            res.sendStatus(httpStatus.unAuthorize);
        }

        next();
    }
}

export default RequestValidator;
