import { Branch } from "../interfaces/branch";

// In-memory branch storage
let branches: Branch[] = [];

// Create Branch
export const createBranch = (newBranch: Branch): Branch => {
    newBranch.id = (branches.length + 1).toString(); // Simple ID generation
    branches.push(newBranch);
    return newBranch;
};

// Get All Branches
export const getAllBranches = (): Branch[] => {
    return branches;
};

// Get Branch by ID
export const getBranchById = (id: string): Branch | undefined => {
    return branches.find(branch => branch.id === id);
};

// Update Branch
export const updateBranch = (id: string, updatedBranch: Branch): Branch | null => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches[index] = { ...branches[index], ...updatedBranch };
        return branches[index];
    }
    return null;
};

// Delete Branch
export const deleteBranch = (id: string): boolean => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches.splice(index, 1);
        return true;
    }
    return false;
};