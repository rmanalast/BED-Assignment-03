/**
 * Controller for handling branch-related operations.
 * Provides endpoints for creating, retrieving, updating, and deleting branches,
 * as well as fetching employees associated with a specific branch.
 */
import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";

/**
 * Creates a new branch.
 * @route POST /branches
 * @param req - Express request object, expects branch details in req.body.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const createBranch = async (
    req: Request, 
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newBranch: Branch = req.body;
        const createdBranch = await branchService.createBranch(newBranch);
        res.status(201).json({ message: "Branch created", data: createdBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all branches.
 * @route GET /branches
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getAllBranches = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(200).json({ message: "Branches retrieved", data: branches });
    } catch (error) {
        next (error);
    }
};

/**
 * Retrieves a branch by its ID.
 * @route GET /branches/:id
 * @param req - Express request object, expects branch ID in req.params.id.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getBranchById = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branch | null = await branchService.getBranchById(req.params.id);

        if (!branch) {
            res.status(404).json({ message: "Branch not found" });
            return;
        }

        res.status(200).json({ message: "Branch found", data: branch });
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing branch by ID.
 * @route PUT /branches/:id
 * @param req - Express request object, expects branch ID in req.params.id and updated details in req.body.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const updateBranch = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const updatedBranch: Branch | null = await branchService.updateBranch(
            req.params.id,
            req.body
        );

        if (!updatedBranch) {
            res.status(404).json({ message: "Branch not found or update failed" });
            return;
        }

        res.status(200).json({ message: "Branch updated", data: updatedBranch });
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes a branch by ID.
 * @route DELETE /branches/:id
 * @param req - Express request object, expects branch ID in req.params.id.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const deleteBranch = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        await branchService.deleteBranch(req.params.id);
        res.status(200).json({ message: "Branch deleted" });
    } catch (error) { 
        next(error);
    }
};

/**
 * Retrieves employees assigned to a specific branch.
 * @route GET /branches/:branchId/employees
 * @param req - Express request object, expects branch ID in req.params.branchId.
 * @param res - Express response object.
 * @param next - Express next middleware function.
 */
export const getEmployeesByBranch = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const branchId = req.params.branchId;
        const employees = await branchService.getEmployeesByBranch(branchId);
        
        if (!employees || employees.length === 0) {
            res.status(404).json({ message: "No employees found for this branch" });
            return;
        }

        res.status(200).json({ message: "Employees retrieved", data: employees });
    } catch (error) {
        next(error);
    }
};
