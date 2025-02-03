import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";

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
 */
export const createBranch = async (req: Request, res: Response): Promise<void> => {
    const newBranch: Branch = req.body;
    const createdBranch = await branchService.createBranch(newBranch);
    res.status(201).json({ message: "Branch created", data: createdBranch });
};

/**
 * @swagger
 * /api/v1/branches:
 *   get:
 *     description: Get all branches
 *     responses:
 *       200:
 *         description: List of all branches
 */
export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
    const branches = await branchService.getAllBranches();
    res.status(200).json({ message: "Branches retrieved", data: branches });
};

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   get:
 *     description: Get a branch by its ID
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
 */
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const branch = await branchService.getBranchById(id);
    if (branch) {
        res.status(200).json({ message: "Branch found", data: branch });
    } else {
        res.status(404).json({ message: "Branch not found" });
    }
};

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   put:
 *     description: Update an existing branch
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
 */
export const updateBranch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const updatedBranch: Branch = req.body;
    const result = await branchService.updateBranch(id, updatedBranch);
    if (result) {
        res.status(200).json({ message: "Branch updated", data: result });
    } else {
        res.status(404).json({ message: "Branch not found" });
    }
};

/**
 * @swagger
 * /api/v1/branches/{id}:
 *   delete:
 *     description: Delete a branch by its ID
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
 */
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await branchService.deleteBranch(id);
    if (result) {
        res.status(200).json({ message: "Branch deleted" });
    } else {
        res.status(404).json({ message: "Branch not found" });
    }
};

/**
 * @swagger
 * /api/v1/branches/{branchId}/employees:
 *   get:
 *     description: Get all employees for a specific branch
 *     parameters:
 *       - in: path
 *         name: branchId
 *         required: true
 *         description: The ID of the branch to get employees for
 *     responses:
 *       200:
 *         description: List of employees for the branch
 *       404:
 *         description: No employees found for this branch
 */
export const getEmployeesByBranch = async (req: Request, res: Response): Promise<void> => {
    const branchId = req.params.branchId;
    const employees = await branchService.getEmployeesByBranch(branchId);

    if (employees.length > 0) {
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } else {
        res.status(404).json({ message: "No employees found for this branch" });
    }
};

/**
 * @swagger
 * /api/v1/branches/{departmentId}/employees:
 *   get:
 *     description: Get all employees for a specific department
 *     parameters:
 *       - in: path
 *         name: departmentId
 *         required: true
 *         description: The ID of the department to get employees for
 *     responses:
 *       200:
 *         description: List of employees in the department
 *       404:
 *         description: No employees found in this department
 */
export const getEmployeesByDepartment = async (req: Request, res: Response): Promise<void> => {
    const departmentId = req.params.departmentId;
    const employees = await branchService.getEmployeesByDepartment(departmentId);

    if (employees.length > 0) {
        res.status(200).json({ message: "Employees retrieved", data: employees });
    } else {
        res.status(404).json({ message: "No employees found in this department" });
    }
};