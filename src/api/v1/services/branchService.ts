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
 * Creates a new branch if it doesn't already exist.
 * @param {Partial<Branch>} branch - The branch details (name, address, phone).
 * @returns {Promise<Branch>} The newly created branch.
 */
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    if (!branch.name || !branch.address || !branch.phone) {
        throw new Error("All fields (name, address, phone) are required.");
    }

    const name = branch.name.trim().toLowerCase();

    const existingBranch = branches.find(b => b.name?.toLowerCase() === name);
    if (existingBranch) {
        throw new Error(`Branch with name "${branch.name}" already exists.`);
    }

    const newBranch: Branch = { id: Date.now().toString(), ...branch } as Branch;
    branches.push(newBranch);
    return newBranch;
};

/**
 * Retrieves all branches.
 * @returns {Promise<Branch[]>} An array of all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => branches;

/**
 * Retrieves a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<Branch>} The found branch.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const branch = branches.find(branch => branch.id === id);
    if (!branch) {
        throw new Error(`Branch with ID "${id}" not found.`);
    }
    return branch;
};

/**
 * Updates a branch by its ID.
 * @param {string} id - The ID of the branch.
 * @param {Partial<Branch>} updatedBranch - The updated branch details.
 * @returns {Promise<Branch>} The updated branch.
 */
export const updateBranch = async (id: string, updatedBranch: Partial<Branch>): Promise<Branch> => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID "${id}" not found.`);
    }

    branches[index] = { ...branches[index], ...updatedBranch };
    return branches[index];
};

/**
 * Deletes a branch and removes associated employees.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<string>} A success message.
 */
export const deleteBranch = async (id: string): Promise<string> => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index === -1) {
        throw new Error(`Branch with ID "${id}" not found.`);
    }

    branches.splice(index, 1);

    // Remove employees belonging to the deleted branch
    employees.forEach((employee, idx) => {
        if (employee.branchId === id) {
            employees.splice(idx, 1);
        }
    });

    return `Branch with ID "${id}" deleted successfully, and its employees have been removed.`;
};

/**
 * Retrieves employees for a specific branch.
 * @param {string} branchId - The branch ID.
 * @returns {Promise<Employee[]>} Employees of the branch.
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.branchId === branchId);
};
