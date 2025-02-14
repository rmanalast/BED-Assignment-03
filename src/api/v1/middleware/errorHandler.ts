/**
 * Error-handling middleware for the application.
 * Catches and processes errors thrown in controllers and services, ensuring
 * consistent error responses.
 * 
 * Logs errors to the console and sends an appropriate JSON response to the client.
 */

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/responseModel";

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
    err: ExtendedError,
    req: Request,
    res: Response,
    _next: NextFunction
): void => {
    const statusCode: number = err.statusCode || 500;
    const code: string = err.code || "UNKNOWN_ERROR";

    console.error(`Error: ${err.message} (Code: ${code})`);

    res.status(statusCode).json(
        errorResponse("An unexpected error occurred. Please try again.", code)
    );
};

export default errorHandler;