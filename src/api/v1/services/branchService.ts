/**
 * Service functions for managing branches and their related operations.
 * Includes functions for creating, retrieving, updating, and deleting branches,
 * as well as retrieving employees associated with a specific branch.
 */
import { Branch } from "../interfaces/branch";
import { sampleBranches } from "../sample data/branchData";
import { Employee } from "../interfaces/employee";
import { sampleEmployees } from "../sample data/employeeData";

const branches: Branch[] = [...sampleBranches];
const employees: Employee[] = [...sampleEmployees];

/**
 * Creates a new branch and adds it to the branches list.
 * @param {Partial<Branch>} branch - The branch details (name, address, phone).
 * @returns {Promise<Branch>} The newly created branch.
 */
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch } as Branch;
    branches.push(newBranch);
    return newBranch;
};

/**
 * Retrieves all branches.
 * @returns {Promise<Branch[]>} An array of all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return branches;
};

/**
 * Retrieves a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<Branch | null>} The found branch or null if not found.
 */
export const getBranchById = async (id: string): Promise<Branch | null> => {
    return branches.find(branch => branch.id === id) || null;
};

/**
 * Updates a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @param {Partial<Branch>} updatedBranch - The updated branch details.
 * @returns {Promise<Branch | null>} The updated branch or null if not found.
 */
export const updateBranch = async (id: string, updatedBranch: Partial<Branch>): Promise<Branch | null> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) return null;
    branches[index] = { ...branches[index], ...updatedBranch };
    return branches[index];
};

/**
 * Deletes a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<boolean>} True if deletion was successful, false otherwise.
 */
export const deleteBranch = async (id: string): Promise<boolean> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) return false;
    branches.splice(index, 1);
    return true;
};

/**
 * Retrieves all employees associated with a given branch.
 * @param {string} branchId - The ID of the branch.
 * @returns {Promise<Employee[]>} An array of employees belonging to the specified branch.
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.branchId === branchId);
};
