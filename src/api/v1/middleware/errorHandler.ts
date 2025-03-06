/**
 * Error-handling middleware for the application.
 * Catches and processes errors thrown in controllers and services, ensuring
 * consistent error responses.
 * 
 * Logs errors to the console and sends an appropriate JSON response to the client.
 */

import { Request, Response, NextFunction } from "express";
import { errorResponse } from "../models/responseModel";
import { AppError, RepositoryError, ServiceError } from "../utils/customErrors";

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
): void => {  // Return type is 'void', not 'Response'
    // Handle RepositoryError (for database-related issues)
    if (err instanceof RepositoryError) {
        res.status(500).json({
            error: "Database error occurred",
            details: err.message
        });
        return;
    }

    // Handle ServiceError (for service or logic-related issues)
    if (err instanceof ServiceError) {
        res.status(400).json({
            error: "Service error occurred",
            details: err.message
        });
        return;
    }

    // Handle AppError (for custom application errors)
    if (err instanceof AppError) {
        res.status(err.statusCode).json(
            errorResponse(err.message, err.code)
        );
        return;
    }

    // Handle unexpected errors (catch-all for any errors that don't match the above)
    console.error(`Unexpected Error: ${err.message}`);
    res.status(500).json(
        errorResponse("An unexpected error occurred.", "UNKNOWN_ERROR")
    );
    return;
};

export default errorHandler;