/**
 * Error-handling middleware for the application.
 * Catches and processes errors thrown in controllers and services, ensuring
 * consistent error responses.
 * 
 * Logs errors to the console and sends an appropriate JSON response to the client.
 */

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/responseModel";
import { AppError } from "../utils/customErrors";

/**
 * Extended error interface that includes additional properties
 * for structured error handling.
 */
interface ExtendedError extends Error {
    /** Optional error code representing the type of error */
    code?: string;
    
    /** Optional HTTP status code for the error response */
    statusCode?: number;
}

/**
 * Global error-handling middleware.
 * 
 * @param err - The error object thrown from controllers or services.
 * @param req - Express request object.
 * @param res - Express response object.
 * @param _next - Express next middleware function (unused but required for middleware signature).
 */
const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (err instanceof AppError) {
        // Handle custom application errors
        res.status(err.statusCode).json(
            errorResponse(err.message, err.code)
        );
    } else {
        // Handle unexpected errors
        console.error(`Unexpected Error: ${err.message}`);
        res.status(500).json(
            errorResponse("An unexpected error occurred.", "UNKNOWN_ERROR")
        );
    }
};

export default errorHandler;