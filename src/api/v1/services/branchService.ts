import { Branch } from "../interfaces/branch";
import { Employee } from "../interfaces/employee";

// In-memory branch storage
let branches: Branch[] = [];

// Mock data for employees
const employees: Employee[] = [
    {
        id: "1", 
        name: "Alice Johnson", 
        position: "Branch Manager", 
        branchId: "1", 
        departmentId: "1",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148"
    },
    {
        id: "2", 
        name: "Amandeep Singh", 
        position: "Customer Service Representative", 
        branchId: "2", 
        departmentId: "2",
        department: "Customer Service",
        email: "amandeep.singh@pixell-river.com",
        phone: "780-555-0172"
    },
    {
        id: "3", 
        name: "Maria Garcia", 
        position: "Loan Officer", 
        branchId: "3", 
        departmentId: "3",
        department: "Loans",
        email: "maria.garcia@pixell-river.com",
        phone: "204-555-0193"
    },
];

/**
 * Create a new branch and add it to the in-memory branch storage.
 * @param newBranch The branch object to be created.
 * @returns The created branch with an assigned ID.
 */
export const createBranch = (newBranch: Branch): Branch => {
    newBranch.id = (branches.length + 1).toString(); // Simple ID generation
    branches.push(newBranch);
    return newBranch;
};

/**
 * Get all branches from the in-memory storage.
 * @returns A list of all branches.
 */
export const getAllBranches = (): Branch[] => {
    return branches;
};

/**
 * Get a branch by its ID.
 * @param id The ID of the branch to be retrieved.
 * @returns The branch with the specified ID, or undefined if not found.
 */
export const getBranchById = (id: string): Branch | undefined => {
    return branches.find(branch => branch.id === id);
};

/**
 * Update the details of a specific branch by its ID.
 * @param id The ID of the branch to be updated.
 * @param updatedBranch The updated branch object.
 * @returns The updated branch, or null if no branch with the specified ID exists.
 */
export const updateBranch = (id: string, updatedBranch: Branch): Branch | null => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches[index] = { ...branches[index], ...updatedBranch };
        return branches[index];
    }
    return null;
};

/**
 * Delete a branch by its ID from the in-memory storage.
 * @param id The ID of the branch to be deleted.
 * @returns A boolean indicating whether the branch was successfully deleted.
 */
export const deleteBranch = (id: string): boolean => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches.splice(index, 1);
        return true;
    }
    return false;
};

/**
 * Get a list of employees working at a specific branch.
 * @param branchId The ID of the branch whose employees are to be retrieved.
 * @returns A list of employees associated with the specified branch.
 */
export const getEmployeesByBranch = (branchId: string): Employee[] => {
    return employees.filter(employee => employee.branchId === branchId);
};

/**
 * Get a list of employees working in a specific department.
 * @param departmentId The ID of the department whose employees are to be retrieved.
 * @returns A list of employees associated with the specified department.
 */
export const getEmployeesByDepartment = (departmentId: string): Employee[] => {
    return employees.filter(employee => employee.departmentId === departmentId);
};