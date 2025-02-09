/**
 * Router for handling employee-related routes.
 * This defines endpoints for creating, retrieving, updating, and deleting employees,
 * as well as retrieving employees associated with a specific employee.
 */
import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const employeeRouter: Router = express.Router();

/**
 * Create a new employee.
 * @route POST /employees
 * @swagger
 * summary: Create a new employee.
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/Employee'
 * responses:
 *   201:
 *     description: Employee created successfully.
 *   400:
 *     description: Invalid request data.
 */
employeeRouter.post("/", employeeController.createEmployee);

/**
 * Get all employees.
 * @route GET /employees
 * @swagger
 * summary: Retrieve all employees.
 * responses:
 *   200:
 *     description: List of employees retrieved successfully.
 */
employeeRouter.get("/", employeeController.getAllEmployees);

/**
 * Get an employee by ID.
 * @route GET /employees/{id}
 * @swagger
 * summary: Retrieve an employee by ID.
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 * responses:
 *   200:
 *     description: Employee retrieved successfully.
 *   404:
 *     description: Employee not found.
 */
employeeRouter.get("/:id", employeeController.getEmployeeById);

/**
 * Update an employee.
 * @route PUT /employees/{id}
 * @swagger
 * summary: Update an existing employee.
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 * requestBody:
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/Employee'
 * responses:
 *   200:
 *     description: Employee updated successfully.
 *   400:
 *     description: Invalid request data.
 *   404:
 *     description: Employee not found.
 */
employeeRouter.put("/:id", employeeController.updateEmployee);

/**
 * Delete an employee.
 * @route DELETE /employees/{id}
 * @swagger
 * summary: Delete an employee by ID.
 * parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     schema:
 *       type: string
 * responses:
 *   200:
 *     description: Employee deleted successfully.
 *   404:
 *     description: Employee not found.
 */
employeeRouter.delete("/:id", employeeController.deleteEmployee);

/**
 * Get employees by department.
 * @route GET /employees/department/{department}
 * @swagger
 * summary: Retrieve employees by department.
 * parameters:
 *   - in: path
 *     name: department
 *     required: true
 *     schema:
 *       type: string
 * responses:
 *   200:
 *     description: Employees retrieved successfully.
 *   404:
 *     description: No employees found in the specified department.
 */
employeeRouter.get("/department/:department", employeeController.getEmployeesByDepartment);

export default employeeRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *       properties:
 *         id:
 *           type: string
 *           description: The employee's unique identifier
 *         name:
 *           type: string
 *           description: The name of the employee
 *         position:
 *           type: string
 *           description: The position of the employee in the company
 *         department:
 *           type: string
 *           description: The department the employee works in
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the employee was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the employee was last updated
 */