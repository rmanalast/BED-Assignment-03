import Joi, { ObjectSchema } from "joi";

/**
 * Validation schema for employee data using Joi.
 * Ensures that employee-related fields conform to expected formats and constraints.
 */
export const employeeSchema: ObjectSchema = Joi.object({
    /**
     * Optional employee ID (string).
     */
    id: Joi.string().optional(),

    /**
     * Employee name, required with a minimum length of 3 and a maximum of 50 characters.
     */
    name: Joi.string().min(3).max(50).required().messages({
        "any.required": "Employee name is required",
        "string.empty": "Employee name cannot be empty",
    }),

    /**
     * Employee position, required with a minimum length of 2 and a maximum of 50 characters.
     */
    position: Joi.string().min(2).max(50).required().messages({
        "any.required": "Position is required",
        "string.empty": "Position cannot be empty",
    }),

    /**
     * Department the employee belongs to, required with a minimum length of 2 and a maximum of 50 characters.
     */
    department: Joi.string().min(2).max(50).required().messages({
        "any.required": "Department is required",
        "string.empty": "Department cannot be empty",
    }),

    /**
     * Employee email address, required and must be a valid email format.
     */
    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Please provide a valid email address",
    }),

    /**
     * Employee phone number, required and must follow the format XXX-XXX-XXXX.
     */
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required().messages({
        "string.pattern.base": "Phone number must follow the format XXX-XXX-XXXX",
    }),

    /**
     * ID of the branch the employee is associated with, required.
     */
    branchId: Joi.string().required().messages({
        "any.required": "Branch ID is required",
        "string.empty": "Branch ID cannot be empty",
    }),
});