import { UNKNOWN_ERROR_CODE } from "../../../constants/errorConstants";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base class for application-specific errors.
 * Extends the built-in Error class and includes additional properties
 * for HTTP status codes and error codes.
 */
class AppError extends Error {
    statusCode: number;
    code: string;

    constructor(message: string, statusCode: number, code: string) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * Represents a validation error (e.g., invalid user input).
 * Extends AppError with a default message, status code 400, and error code "VALIDATION_ERROR".
 */
class ValidationError extends AppError {
    constructor(message = "Invalid input") {
        super(message, 400, "VALIDATION_ERROR");
    }
}

/**
 * Represents a "Not Found" error when a requested resource is missing.
 * Extends AppError with a default message, status code 404, and error code "NOT_FOUND".
 */
class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404, "NOT_FOUND");
    }
}

/**
 * Represents an "Unauthorized" error when a user lacks authentication.
 * Extends AppError with a default message, status code 401, and error code "UNAUTHORIZED".
 */
class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized access") {
        super(message, 401, "UNAUTHORIZED");
    }
}

/**
 * Represents a "Forbidden" error when a user lacks permission for an action.
 * Extends AppError with a default message, status code 403, and error code "FORBIDDEN".
 */
class ForbiddenError extends AppError {
    constructor(message = "Forbidden action") {
        super(message, 403, "FORBIDDEN");
    }
}

/**
 * Represents an error occurring at the repository layer (e.g., database issues).
 * Extends AppError with a default message, status code 500, and error code "REPOSITORY_ERROR".
 */
class RepositoryError extends AppError {
    constructor(message = "Database operation failed") {
        super(message, 500, "REPOSITORY_ERROR");
    }
}

/**
 * Represents an error occurring at the service layer (e.g., business logic failures).
 * Extends AppError with a default message, status code 500, and error code "SERVICE_ERROR".
 */
class ServiceError extends AppError {
    constructor(message = "Service operation failed") {
        super(message, 500, "SERVICE_ERROR");
    }
}

/**
 * Type guard to check if an unknown value is an Error object.
 * @param error - Value to check
 * @returns True if the value is an Error instance, false otherwise
 */
export function isError(error: unknown): error is Error {
    return error instanceof Error;
}

/**
 * Type guard to check if an object has a 'code' property of type string.
 * @param error - Value to check
 * @returns True if the value is an object with a string code property
 */
export function hasErrorCode(error: unknown): error is { code: string } {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        typeof (error as Record<string, unknown>).code === "string"
    );
}

/**
 * Safely extracts an error message from an unknown value.
 * @param error - Value to extract message from
 * @returns String representation of the error
 */
export function getErrorMessage(error: unknown): string {
    if (isError(error)) {
        return error.message;
    }
    return String(error);
}

/**
 * Safely extracts an error code from an unknown value.
 * @param error - Value to extract code from
 * @returns Error code string
 */
export function getErrorCode(error: unknown): string {
    if (hasErrorCode(error)) {
        return error.code;
    }
    return UNKNOWN_ERROR_CODE;
}

/**
 * Maps Firebase error codes to HTTP status codes.
 * @param error - Firebase error to map
 * @returns HTTP status code
 */
export function getFirebaseErrorStatusCode(error: unknown): number {
    if (hasErrorCode(error)) {
        switch (error.code) {
            case "not-found":
                return HTTP_STATUS.NOT_FOUND;
            case "already-exists":
                return HTTP_STATUS.CONFLICT;
            case "permission-denied":
                return HTTP_STATUS.FORBIDDEN;
            case "unauthenticated":
                return HTTP_STATUS.UNAUTHORIZED;
            case "invalid-argument":
                return HTTP_STATUS.BAD_REQUEST;
            default:
                return HTTP_STATUS.INTERNAL_SERVER_ERROR;
        }
    }
    return HTTP_STATUS.INTERNAL_SERVER_ERROR;
}

export { 
    AppError, 
    ValidationError, 
    NotFoundError, 
    UnauthorizedError, 
    ForbiddenError, 
    RepositoryError, 
    ServiceError 
};