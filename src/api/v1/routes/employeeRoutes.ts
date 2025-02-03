import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/employees:
 *   post:
 *     description: Create a new employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       500:
 *         description: Failed to create employee
 */
router.post("/employees", employeeController.createEmployee);

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     description: Get all employees
 *     responses:
 *       200:
 *         description: List of all employees
 *       500:
 *         description: Failed to fetch employees
 */
router.get("/employees", employeeController.getAllEmployees);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     description: Get an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to retrieve
 *     responses:
 *       200:
 *         description: Employee found
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to fetch employee
 */
router.get("/employees/:id", employeeController.getEmployeeById);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     description: Update an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to update employee
 */
router.put("/employees/:id", employeeController.updateEmployee);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     description: Delete an employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the employee to delete
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Failed to delete employee
 */
router.delete("/employees/:id", employeeController.deleteEmployee);

export default router;