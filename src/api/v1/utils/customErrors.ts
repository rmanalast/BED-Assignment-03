/**
 * Base class for application-specific errors.
 * Extends the built-in Error class and includes additional properties
 * for HTTP status codes and error codes.
 */
class AppError extends Error {
    /**
     * HTTP status code associated with the error.
     */
    statusCode: number;

    /**
     * Unique error code to help categorize the error.
     */
    code: string;

    /**
     * Constructs an instance of AppError.
     * @param message - A descriptive error message.
     * @param statusCode - The HTTP status code for the error.
     * @param code - A unique error code identifier.
     */
    constructor(message: string, statusCode: number, code: string) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;

        // Ensures proper prototype chain for custom error classes
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

/**
 * Represents a validation error (e.g., invalid user input).
 * Extends AppError with a default message, status code 400, and error code "VALIDATION_ERROR".
 */
class ValidationError extends AppError {
    /**
     * Constructs a ValidationError instance.
     * @param message - A descriptive error message (default: "Invalid input").
     */
    constructor(message = "Invalid input") {
        super(message, 400, "VALIDATION_ERROR");
    }
}

/**
 * Represents a "Not Found" error when a requested resource is missing.
 * Extends AppError with a default message, status code 404, and error code "NOT_FOUND".
 */
class NotFoundError extends AppError {
    /**
     * Constructs a NotFoundError instance.
     * @param message - A descriptive error message (default: "Resource not found").
     */
    constructor(message = "Resource not found") {
        super(message, 404, "NOT_FOUND");
    }
}

/**
 * Represents an "Unauthorized" error when a user lacks authentication.
 * Extends AppError with a default message, status code 401, and error code "UNAUTHORIZED".
 */
class UnauthorizedError extends AppError {
    /**
     * Constructs an UnauthorizedError instance.
     * @param message - A descriptive error message (default: "Unauthorized access").
     */
    constructor(message = "Unauthorized access") {
        super(message, 401, "UNAUTHORIZED");
    }
}

/**
 * Represents a "Forbidden" error when a user lacks permission for an action.
 * Extends AppError with a default message, status code 403, and error code "FORBIDDEN".
 */
class ForbiddenError extends AppError {
    /**
     * Constructs a ForbiddenError instance.
     * @param message - A descriptive error message (default: "Forbidden action").
     */
    constructor(message = "Forbidden action") {
        super(message, 403, "FORBIDDEN");
    }
}

/**
 * Represents an error occurring at the repository layer (e.g., database issues).
 * Extends AppError with a default message, status code 500, and error code "REPOSITORY_ERROR".
 */
class RepositoryError extends AppError {
    /**
     * 
     * @param message 
     */
    constructor(message = "Database operation failed") {
        super(message, 500, "REPOSITORY_ERROR");
    }
}

/**
 * Represents an error occurring at the service layer (e.g., business logic failures).
 * Extends AppError with a default message, status code 500, and error code "SERVICE_ERROR".
 */
class ServiceError extends AppError {
    /**
     * 
     * @param message 
     */
    constructor(message = "Service operation failed") {
        super(message, 500, "SERVICE_ERROR");
    }
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