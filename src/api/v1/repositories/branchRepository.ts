/**
 * Repository for managing branch-related operations in Firestore.
 */
import { db } from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { RepositoryError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
    getFirebaseErrorStatusCode,
} from "../utils/customErrors";

import { Branch } from "../interfaces/branch";

/**
 * Handles Firestore operations for branches.
 */
export class BranchRepository {
    private collectionName = "branches";
    private employeesCollection = "employees";

    /**
     * Creates a new branch in Firestore.
     * @param data - The data for the new branch.
     * @returns The ID of the created branch.
     * @throws RepositoryError if the creation fails.
     */
    async createBranch(data: any): Promise<string> {
        try {
            const branchData = { ...data, createdAt: FieldValue.serverTimestamp() };
            const docRef = await db.collection(this.collectionName).add(branchData);
            return docRef.id;
        } catch (error) {
            throw new RepositoryError(
                `Failed to create branch: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Retrieves a branch by its ID.
     * @param id - The ID of the branch to retrieve.
     * @returns The branch data or null if not found.
     * @throws RepositoryError if the retrieval fails.
     */
    async getBranchById(id: string): Promise<any | null> {
        try {
            const doc = await db.collection(this.collectionName).doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data();
            return {
                ...data,
                createdAt: data?.createdAt ? (data.createdAt as Timestamp).toDate() : null,
            };
        } catch (error) {
            throw new RepositoryError(
                `Failed to get branch by ID: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Retrieves all branches from Firestore.
     * @returns An array of all branches.
     * @throws RepositoryError if the retrieval fails.
     */
    async getAllBranches(): Promise<any[]> {
        try {
            const snapshot = await db.collection(this.collectionName).get();
            return snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data?.createdAt ? (data.createdAt as Timestamp).toDate() : null,
                };
            });
        } catch (error) {
            throw new RepositoryError(
                `Failed to fetch all branches: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Updates an existing branch in Firestore.
     * @param id - The ID of the branch to update.
     * @param data - The updated branch data.
     * @returns {Promise<void>}
     * @throws {RepositoryError} if the update fails.
     */
    async updateBranch(id: string, data: Partial<Branch>): Promise<void> {
      try {
          const branchDoc = db.collection(this.collectionName).doc(id);
          
          // Only update fields that are present in the data object
          await branchDoc.update({
              ...data,
              updatedAt: FieldValue.serverTimestamp(), // Optionally update the timestamp
          });
      } catch (error) {
          throw new RepositoryError(
              `Failed to update branch with ID ${id}: ${getErrorMessage(error)}`,
              getErrorCode(error),
              getFirebaseErrorStatusCode(error)
          );
      }
    }

    /**
     * Deletes a branch by its ID.
     * @param id - The ID of the branch to delete.
     * @throws RepositoryError if the deletion fails.
     */
    async deleteBranch(id: string): Promise<void> {
      try {
          const branchDoc = db.collection(this.collectionName).doc(id);
          await branchDoc.delete();
      } catch (error) {
          throw new RepositoryError(
              `Failed to delete branch: ${getErrorMessage(error)}`,
              getErrorCode(error),
              getFirebaseErrorStatusCode(error)
          );
      }
    }

    /**
     * Retrieves employees associated with a specific branch.
     * @param branchId - The ID of the branch to fetch employees for.
     * @returns An array of employees associated with the branch.
     * @throws RepositoryError if the retrieval fails.
     */
    async getEmployeesByBranch(branchId: string): Promise<any[]> {
        try {
            const snapshot = await db
                .collection(this.employeesCollection)  // Use employees collection
                .where("branchId", "==", branchId)
                .get();
            return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            throw new RepositoryError(
                `Failed to fetch employees by branch: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }
}