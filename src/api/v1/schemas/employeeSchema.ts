import Joi from "joi";

/**
 * Validation schema for employee data using Joi.
 * Ensures that employee-related fields conform to expected formats and constraints.
 */
export const employeeSchema = Joi.object({
    /**
     * Optional employee ID (string).
     */
    id: Joi.string().optional(),

    /**
     * Employee name, required with a minimum length of 3 and a maximum of 50 characters.
     */
    name: Joi.string().min(3).max(50).required(),

    /**
     * Employee position, required with a minimum length of 2 and a maximum of 50 characters.
     */
    position: Joi.string().min(2).max(50).required(),

    /**
     * Department the employee belongs to, required with a minimum length of 2 and a maximum of 50 characters.
     */
    department: Joi.string().min(2).max(50).required(),

    /**
     * Employee email address, required and must be a valid email format.
     */
    email: Joi.string().email().required(),

    /**
     * Employee phone number, required and must follow the format XXX-XXX-XXXX.
     */
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),

    /**
     * ID of the branch the employee is associated with, required.
     */
    branchId: Joi.string().required(),
});