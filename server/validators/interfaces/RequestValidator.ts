import { Response, Request } from "express";

interface RequestValidator {
    validate(req: Request, res: Response, next): void;
}

export default RequestValidator;
