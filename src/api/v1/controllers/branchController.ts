import { Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../interfaces/branch";

// Create Branch
export const createBranch = async (req: Request, res: Response): Promise<void> => {
    const newBranch: Branch = req.body;
    const createdBranch = await branchService.createBranch(newBranch);
    res.status(201).json({ message: "Branch created", data: createdBranch });
};

// Get All Branches
export const getAllBranches = async (req: Request, res: Response): Promise<void> => {
    const branches = await branchService.getAllBranches();
    res.status(200).json({ message: "Branches retrieved", data: branches });
};

// Get Branch by ID
export const getBranchById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const branch = await branchService.getBranchById(id);
    if (branch) {
        res.status(200).json({ message: "Branch found", data: branch });
    } else {
        res.status(404).json({ message: "Branch not found" });
    }
};

// Update Branch
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

// Delete Branch
export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const result = await branchService.deleteBranch(id);
    if (result) {
        res.status(200).json({ message: "Branch deleted" });
    } else {
        res.status(404).json({ message: "Branch not found" });
    }
};