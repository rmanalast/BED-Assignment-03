import Joi, { ObjectSchema } from "joi";

/**
 * Validation schema for branch data using Joi.
 * Ensures that branch-related fields conform to expected formats and constraints.
 */
export const branchSchema: ObjectSchema = Joi.object({
    /**
     * Optional branch ID (string).
     */
    id: Joi.string().optional(),

    /**
     * Branch name, required with a minimum length of 3 and a maximum of 50 characters.
     */
    name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Branch name is required",
        "string.empty": "Branch name cannot be empty",
    }),

    /**
     * Branch address, required with a minimum length of 5 characters.
     */
    address: Joi.string().min(5).required().messages({
        "any.required": "Branch address is required",
        "string.empty": "Branch address cannot be empty",
    }),

    /**
     * Branch phone number, required and must follow the format XXX-XXX-XXXX.
     */
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        "string.pattern.base": "Phone number must follow the format XXX-XXX-XXXX",
    }),
});