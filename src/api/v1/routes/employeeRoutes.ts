/**
 * Router for handling employee-related routes.
 * This defines endpoints for creating, retrieving, updating, and deleting employees,
 * as well as retrieving employees associated with a specific department.
 */
import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import validateRequest from "../middleware/validateRequest";
import { employeeSchema } from "../schemas/employeeSchema";

const employeeRouter: Router = express.Router();

/**
 * Route to create a new employee.
 * @route POST /employees
 * @swagger
 * /employees:
 *   post:
 *     summary: Create a new employee
 *     description: Adds a new employee to the system.
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid input data
 */

// Create a new employee with validation
employeeRouter.post("/", validateRequest(employeeSchema), employeeController.createEmployee);

/**
 * Route to get all employees.
 * @route GET /employees
 * @swagger
 * /employees:
 *   get:
 *     summary: Retrieve all employees
 *     description: Fetches a list of all employees.
 *     tags:
 *       - Employees
 *     responses:
 *       200:
 *         description: Successfully retrieved employees
 *       500:
 *         description: Server error
 */
employeeRouter.get("/", employeeController.getAllEmployees);

/**
 * Route to get an employee by ID.
 * @route GET /employees/:id
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Retrieve a specific employee
 *     description: Fetches details of an employee using their ID.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       404:
 *         description: Employee not found
 */
employeeRouter.get("/:id", employeeController.getEmployeeById);

/**
 * Route to update an employee.
 * @route PUT /employees/:id
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Update an employee
 *     description: Modifies the details of an existing employee.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Employee not found
 */

// Update an employee with validation
employeeRouter.put("/:id", validateRequest(employeeSchema), employeeController.updateEmployee);

/**
 * Route to delete an employee.
 * @route DELETE /employees/:id
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Removes an employee from the system.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 */
employeeRouter.delete("/:id", employeeController.deleteEmployee);

/**
 * Route to get employees by department.
 * @route GET /employees/department/{department}
 * @swagger
 * /employees/department/{department}:
 *   get:
 *     summary: Retrieve employees by department
 *     description: Fetches a list of employees assigned to a specific department.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         description: The department name
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       404:
 *         description: Department not found or no employees assigned
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