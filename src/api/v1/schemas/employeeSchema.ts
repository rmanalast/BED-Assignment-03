import Joi from "joi";

export const employeeSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().min(3).max(50).required(),
    position: Joi.string().min(2).max(50).required(),
    department: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
    branchId: Joi.string().required(),
});