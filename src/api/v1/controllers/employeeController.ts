/**
 * Employee Controller (employeeController.ts)
 *
 * This file defines functions (controllers) for handling incoming requests related to employees.
 * These functions interact with the employee service (employeeService.ts) to perform the actual
 * logic for CRUD operations on employees.
 */

import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/employee";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NotFoundError, ValidationError } from "../utils/customErrors";

/**
 * @description Get all employees.
 * @route GET /employees
 * @returns {Promise<void>}
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get an employee by ID.
 * @route GET /employees/:id
 * @returns {Promise<void>}
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employee | null = await employeeService.getEmployeeById(req.params.id);

        if (!employee) {
            return next(new NotFoundError("Employee not found."));
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Create a new employee.
 * @route POST /employees
 * @returns {Promise<void>}
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, position, department } = req.body;

        if (!name || !position || !department) {
            return next(new ValidationError("Employee name, position, and department are required."));
        }

        const newEmployee: Employee = await employeeService.createEmployee(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee Created")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing employee.
 * @route PUT /employees/:id
 * @returns {Promise<void>}
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, position, department, email, phone } = req.body;

        if (!name || !position || !department || !email || !phone) {
            return next(new ValidationError("Employee name, position, and department are required."));
        }

        const updatedEmployee: Employee | null = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        if (!updatedEmployee) {
            return next(new NotFoundError("Employee not found or update failed."));
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee Updated")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete an employee.
 * @route DELETE /employees/:id
 * @returns {Promise<void>}
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await employeeService.deleteEmployee(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Employee Deleted",
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employees by department.
 * @route GET /employees/department/:department
 * @returns {Promise<void>}
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getEmployeesByDepartment(req.params.department);

        if (!employees || employees.length === 0) {
            return next(new NotFoundError("No employees found for this department."));
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees Retrieved")
        );
    } catch (error) {
        next(error);
    }
};
