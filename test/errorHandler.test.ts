import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { AppError } from "../src/api/v1/utils/customErrors";

describe("Error Handling Middleware", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as Partial<Response>;
        next = jest.fn();
    });

    test("should handle AppError and return custom error response", () => {
        const err = new AppError("Validation failed", 400, "VALIDATION_ERROR");
        errorHandler(err, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "Validation failed",
            code: "VALIDATION_ERROR"
        });
    });

    test("should handle unexpected errors and return 500", () => {
        const err = new Error("Something went wrong");
        errorHandler(err, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: "error",
            message: "An unexpected error occurred.",
            code: "UNKNOWN_ERROR"
        });
    });
});
