/**
 * Branch Controller (branchController.ts)
 *
 * This file defines functions (controllers) for handling incoming requests related to branches.
 * These functions interact with the branch service (branchService.ts) to perform the actual
 * logic for CRUD operations on branches.
 */

import { Request, Response, NextFunction } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";
import { Employee } from "../interfaces/employee";
import { successResponse } from "../models/responseModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { NotFoundError } from "../utils/customErrors";

/**
 * @description Get all branches.
 * @route GET /branches
 * @returns {Promise<void>}
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();

        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get a branch by ID.
 * @route GET /branches/:id
 * @returns {Promise<void>}
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branch: Branch | null = await branchService.getBranchById(
            req.params.id
        );

        if (!branch) {
            return next(new NotFoundError("Branch not found."));
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branch Retrieved")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Create a new branch.
 * @route POST /branches
 * @returns {Promise<void>}
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const newBranch: Branch = await branchService.createBranch(req.body);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch Created")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Update an existing branch.
 * @route PUT /branches/:id
 * @returns {Promise<void>}
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
            return next(new NotFoundError("Branch not found or update failed."));
        }

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch Updated")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * @description Delete a branch.
 * @route DELETE /branches/:id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await branchService.deleteBranch(id);
        res.status(200).json({
            message: "Branch Deleted",
            status: "success",
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @description Get employees by branch ID.
 * @route GET /branches/:branchId/employees
 * @returns {Promise<void>}
 */
export const getEmployeesByBranch = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const branchId = req.params.branchId;
        
        // Ensure that the service is returning an array
        const employees: Employee[] = await branchService.getEmployeesByBranch(branchId);

        if (!employees || employees.length === 0) {
            return next(new NotFoundError("No employees found for this branch."));
        }

        res.status(HTTP_STATUS.OK).json(successResponse(employees, "Employees Retrieved"));
    } catch (error) {
        next(error);
    }
};