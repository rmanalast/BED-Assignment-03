/**
 * Service functions for managing branches and their related operations.
 * Includes functions for creating, retrieving, updating, and deleting branches,
 * as well as retrieving employees associated with a specific branch.
 */
import { Branch } from "../interfaces/branch";
import { sampleBranches } from "../sample data/branchData";
import { Employee } from "../interfaces/employee";
import { sampleEmployees } from "../sample data/employeeData";

const branches: Branch[] = [];
const employees: Employee[] = [];

/**
 * Creates a new branch and adds it to the branches list.
 * @param {Object} branch - The branch details (name, address, phone).
 * @returns {Promise<Branch>} The newly created branch.
 */
export const createBranch = async (branch: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const newBranch: Branch = { id: Date.now().toString(), ...branch };
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
 * @param {any} body - Additional request data (if applicable).
 * @returns {Branch[]} An array containing the found branch or an empty array if not found.
 */
export const getBranchById = (id: string, body: any): Branch[] => {
    const foundBranch = branches.find(branch => branch.id === id);
    return foundBranch ? [foundBranch] : [];
};

/**
 * Updates a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @param {Object} updatedBranch - The updated branch details (name, address, phone).
 * @returns {Promise<Branch>} The updated branch.
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    updatedBranch: { name: string; address: string; phone: string }
): Promise<Branch> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches[index] = { id, ...updatedBranch };
    return branches[index];
};

/**
 * Deletes a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<void>} Resolves when the branch is deleted.
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const index: number = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID ${id} not found`);
    }
    branches.splice(index, 1);
};

/**
 * Retrieves all employees associated with a given branch.
 * @param {string} branchId - The ID of the branch.
 * @returns {Promise<Employee[]>} An array of employees belonging to the specified branch.
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.branchId === branchId);
};