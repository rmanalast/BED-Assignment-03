/**
 * Generic API response structure for consistent responses across the application.
 * 
 * @template T - The type of data included in the response.
 */
interface ApiResponse<T> {
    /**
     * Indicates the status of the response (e.g., "success" or "error").
     */
    status: string;

    /**
     * The payload data, if applicable.
     */
    data?: T;

    /**
     * A descriptive message about the response.
     */
    message?: string;

    /**
     * Error details, if applicable.
     */
    error?: string;

    /**
     * A specific error code for identifying the type of error.
     */
    code?: string;
}

/**
 * Creates a success response object.
 * 
 * @template T - The type of data included in the response.
 * @param data - The payload data (optional).
 * @param message - A success message (optional).
 * @returns An API response object indicating success.
 */
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message,
});

/**
 * Creates an error response object.
 * 
 * @param message - A descriptive error message.
 * @param code - A specific error code for identifying the type of error (optional).
 * @returns An API response object indicating an error.
 */
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    message,
    code,
});