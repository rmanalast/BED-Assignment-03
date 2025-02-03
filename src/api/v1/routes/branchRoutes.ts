import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/branches:
 *   post:
 *     description: Create a new branch
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       500:
 *         description: Failed to create branch
 */
router.post("/branches", branchController.createBranch);

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     description: Get all branches
 *     responses:
 *       200:
 *         description: List of all branches
 *       500:
 *         description: Failed to fetch branches
 */
router.get("/branches", branchController.getAllBranches);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     description: Get a branch by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to retrieve
 *     responses:
 *       200:
 *         description: Branch found
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Failed to fetch branch
 */
router.get("/branches/:id", branchController.getBranchById);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     description: Update a branch by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Failed to update branch
 */
router.put("/branches/:id", branchController.updateBranch);

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     description: Delete a branch by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the branch to delete
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Failed to delete branch
 */
router.delete("/branches/:id", branchController.deleteBranch);

/**
 * @swagger
 * /api/v1/branches/{branchId}/employees:
 *   get:
 *     description: Get all employees of a specific branch
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: The ID of the branch to retrieve employees for
 *     responses:
 *       200:
 *         description: List of employees in the branch
 *       404:
 *         description: No employees found for this branch
 *       500:
 *         description: Failed to fetch employees for this branch
 */
router.get("/branches/:branchId/employees", branchController.getEmployeesByBranch);

/**
 * @swagger
 * /api/v1/branches/department/{departmentId}/employees:
 *   get:
 *     description: Get all employees in a specific department across all branches
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         description: The ID of the department to retrieve employees for
 *     responses:
 *       200:
 *         description: List of employees in the department
 *       404:
 *         description: No employees found for this department
 *       500:
 *         description: Failed to fetch employees for this department
 */
router.get("/branches/department/:departmentId/employees", branchController.getEmployeesByDepartment);

export default router;
