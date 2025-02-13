import Joi from "joi";

export const branchSchema = Joi.object({
    id: Joi.string().optional(),
    name: Joi.string().min(3).max(50).required(),
    address: Joi.string().min(5).required(),
    phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/).required(),
});