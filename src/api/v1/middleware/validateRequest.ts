/**
 * Middleware for validating request bodies against a given Joi schema.
 * Ensures that incoming request data conforms to the expected structure
 * before passing it to the next middleware or controller.
 * 
 * If validation fails, it responds with a 400 status and an array of validation error messages.
 */

import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Validates the request body using the provided Joi schema.
 * 
 * @param schema - The Joi schema to validate the request body against.
 * @returns Express middleware function that performs validation.
 */
const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({ errors: error.details.map((err) => err.message) });
      return;
    }

    next();
  };
};

export default validateRequest;