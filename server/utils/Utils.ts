import { Response, Request } from "express";

export const httpStatus = {
    okay: 200,
    badRequest: 400,
    unAuthorize: 401,
    notFound: 404,
    internalServerError: 500
};

export function requestValidation(req: Request, res: Response, next): void {
    if (!req.headers || req.headers["x-auth"] !== "cmklFinance") {
        res.sendStatus(httpStatus.unAuthorize);
    }

    next();
}
