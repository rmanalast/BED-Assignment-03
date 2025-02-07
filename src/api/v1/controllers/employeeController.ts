/**
 * Controller for handling employee-related operations.
 * Provides endpoints for creating, retrieving, updating, and deleting employees,
 * as well as retrieving employees by department.
 */
import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/employee";

/**
 * Creates a new employee.
 * @route POST /employees
 * @param req - Express request object, expects employee details in req.body.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const createEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newEmployee: Employee = req.body;
        const createdEmployee = await employeeService.createEmployee(newEmployee);
        res.status(201).json({ message: "Employee created", data: createdEmployee});
    } catch (error) {
        next(error);
    }
};

/**
 * Get all employees.
 * @route GET /employees
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getAllEmployees = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        next (error);
    }
};

/**
 * Get an employee by ID.
 * @route GET /employees/:id
 * @param req - Express request object, expects employee ID in req.params.id.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getEmployeeById = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employee: Employee | null = await employeeService.getEmployeeById(req.params.id);

        if (!employee) {
            res.status(404).json({ message: "Employee not found" });
            return;
        }

        res.status(200).json({ message: "Employee found", data: employee });
    } catch (error) {
        next(error);
    }
};

/**
 * Update an employee.
 * @route PUT /employees/:id
 * @param req - Express request object, expects employee ID in req.params.id and updated details in req.body.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const updateEmployee = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const updatedEmployee: Employee | null = await employeeService.updateEmployee(
            req.params.id,
            req.body
        );

        if (!updatedEmployee) {
            res.status(404).json({ message: "Employee not found or update failed" });
            return;
        }

        res.status(200).json({ message: "Employee updated", data: updatedEmployee });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete an employee.
 * @route DELETE /employees/:id
 * @param req - Express request object, expects employee ID in req.params.id.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const deleteEmployee = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await employeeService.deleteEmployee(req.params.id);
        res.status(200).json({ message: "Employee deleted"});
    } catch (error) {
        next(error)
    }
};

/**
 * Get employees by department.
 * @route GET /employees/department/:department
 * @param req - Express request object, expects department name in req.params.department.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getEmployeesByDepartment = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.params;
        const employees = await employeeService.getEmployeesByDepartment(department);
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};
