/**
 * Service functions for managing branches and their related operations.
 * Includes functions for creating, retrieving, updating, and deleting branches,
 * as well as retrieving employees associated with a specific branch.
 * Uses Firestore for data persistence via BranchRepository.
 */
import { Branch } from "../interfaces/branch";
import { Employee } from "../interfaces/employee";
import { BranchRepository } from "../repositories/branchRepository";
import { ServiceError, NotFoundError, ValidationError } from "../utils/customErrors";

const branchRepository = new BranchRepository();

/**
 * Creates a new branch in Firestore.
 * @param {Partial<Branch>} branch - The branch details (name, address, phone).
 * @returns {Promise<Branch>} The newly created branch.
 * @throws {ValidationError} If required fields are missing.
 * @throws {ServiceError} If the creation process fails.
 */
export class BranchService {
    private branchRepository: BranchRepository;

    constructor(branchRepository?: BranchRepository) {
        this.branchRepository = branchRepository || new BranchRepository();
    }

    /**
     * Creates a new branch in Firestore.
     * @param {Partial<Branch>} branch - The branch details (name, address, phone).
     * @returns {Promise<Branch>} The newly created branch.
     * @throws {ValidationError} If required fields are missing.
     */
    async createBranch(branch: Partial<Branch>): Promise<Branch> {
        if (!branch.name || !branch.address || !branch.phone) {
            throw new ValidationError("All fields (name, address, phone) are required.");
        }

        try {
            const branchId = await this.branchRepository.createBranch(branch);
            return { id: branchId, ...branch } as Branch;
        } catch (error) {
            throw new ServiceError(`Failed to create branch: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves all branches from Firestore.
     * @returns {Promise<Branch[]>} An array of all branches.
     * @throws {ServiceError} If retrieval fails.
     */
    async getAllBranches(): Promise<Branch[]> {
        try {
            return await this.branchRepository.getAllBranches();
        } catch (error) {
            throw new ServiceError(`Failed to fetch branches: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves a branch by its ID.
     * @param {string} id - The ID of the branch.
     * @returns {Promise<Branch>} The found branch.
     * @throws {NotFoundError} If the branch is not found.
     * @throws {ServiceError} If retrieval fails.
     */
    async getBranchById(id: string): Promise<Branch> {
        try {
            const branch = await this.branchRepository.getBranchById(id);
            if (!branch) {
                throw new NotFoundError(`Branch with ID "${id}" not found.`);
            }
            return branch;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ServiceError(`Failed to fetch branch by ID (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }


    /**
     * Updates a branch by its ID in Firestore.
     * @param {string} id - The ID of the branch.
     * @param {Partial<Branch>} updatedBranch - The updated branch details.
     * @returns {Promise<Branch>} The updated branch.
     * @throws {NotFoundError} If the branch does not exist.
     * @throws {ServiceError} If the update fails.
     */
    async updateBranch(id: string, updatedBranch: Partial<Branch>): Promise<Branch> {
        try {
            const existingBranch = await this.branchRepository.getBranchById(id);
            if (!existingBranch) {
                throw new NotFoundError(`Branch with ID "${id}" not found.`);
            }

            await this.branchRepository.updateBranch(id, updatedBranch);
            return { id, ...existingBranch, ...updatedBranch };
        } catch (error) {
            throw new ServiceError(`Failed to update branch (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Deletes a branch from Firestore.
     * @param {string} id - The ID of the branch.
     * @returns {Promise<string>} A success message.
     * @throws {NotFoundError} If the branch is not found.
     * @throws {ServiceError} If deletion fails.
     */
    async deleteBranch(id: string): Promise<string> {
        try {
            const existingBranch = await this.branchRepository.getBranchById(id);
            if (!existingBranch) {
                throw new NotFoundError(`Branch with ID "${id}" not found.`);
            }

            await this.branchRepository.deleteBranch(id);
            return `Branch with ID "${id}" deleted successfully.`;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ServiceError(`Failed to delete branch (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves employees for a specific branch from Firestore.
     * @param {string} branchId - The branch ID.
     * @returns {Promise<Employee[]>} Employees of the branch.
     * @throws {ServiceError} If retrieval fails.
     */
    async getEmployeesByBranch(branchId: string): Promise<Employee[]> {
        try {
            return await this.branchRepository.getEmployeesByBranch(branchId);
        } catch (error) {
            throw new ServiceError(`Failed to fetch employees for branch (${branchId}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }
}