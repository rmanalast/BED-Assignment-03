/**
 * Router for handling branch-related routes.
 * This defines endpoints for creating, retrieving, updating, and deleting branches,
 * as well as retrieving employees associated with a specific branch.
 */
import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const branchRouter: Router = express.Router();

/**
 * Route to create a new branch.
 * @route POST /branches
 * @swagger
 * /branches:
 *   post:
 *     summary: Create a new branch
 *     description: Adds a new branch to the system.
 *     tags:
 *       - Branches
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       201:
 *         description: Branch created successfully
 *       400:
 *         description: Invalid input data
 */
branchRouter.post("/", branchController.createBranch);

/**
 * Route to get all branches.
 * @route GET /branches
 * @swagger
 * /branches:
 *   get:
 *     summary: Retrieve all branches
 *     description: Fetches a list of all branches.
 *     tags:
 *       - Branches
 *     responses:
 *       200:
 *         description: Successfully retrieved branches
 *       500:
 *         description: Server error
 */
branchRouter.get("/", branchController.getAllBranches);

/**
 * Route to get a branch by ID.
 * @route GET /branches/:id
 * @swagger
 * /branches/{id}:
 *   get:
 *     summary: Retrieve a specific branch
 *     description: Fetches details of a branch using its ID.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: Branch retrieved successfully
 *       404:
 *         description: Branch not found
 */
branchRouter.get("/:id", branchController.getBranchById);

/**
 * Route to update a branch.
 * @route PUT /branches/:id
 * @swagger
 * /branches/{id}:
 *   put:
 *     summary: Update a branch
 *     description: Modifies the details of an existing branch.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Branch'
 *     responses:
 *       200:
 *         description: Branch updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Branch not found
 */
branchRouter.put("/:id", branchController.updateBranch);

/**
 * Route to delete a branch.
 * @route DELETE /branches/:id
 * @swagger
 * /branches/{id}:
 *   delete:
 *     summary: Delete a branch
 *     description: Removes a branch from the system.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 *       404:
 *         description: Branch not found
 */
branchRouter.delete("/:id", branchController.deleteBranch);

/**
 * Route to get all employees in a specific branch.
 * @route GET /branches/:branchId/employees
 * @swagger
 * /branches/{branchId}/employees:
 *   get:
 *     summary: Retrieve employees by branch
 *     description: Fetches a list of employees assigned to a specific branch.
 *     tags:
 *       - Branches
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         schema:
 *           type: string
 *         description: The branch ID
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       404:
 *         description: Branch not found or no employees assigned
 */
branchRouter.get("/:branchId/employees", branchController.getEmployeesByBranch);

export default branchRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The branch's unique identifier
 *         name:
 *           type: string
 *           description: The name of the branch
 *         location:
 *           type: string
 *           description: The location of the branch
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the branch was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The timestamp when the branch was last updated
 */