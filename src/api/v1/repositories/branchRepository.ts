/**
 * Repository for managing branch-related operations in Firestore.
 */
import { db } from "../../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot, Timestamp, FieldValue } from "firebase-admin/firestore";
import { RepositoryError } from "../utils/customErrors";

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
      const docRef: DocumentReference = await db.collection(this.collectionName).add(branchData);
      return docRef.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to create branch: ${errorMessage}`);
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
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to get branch by ID: ${errorMessage}`);
    }
  }

  /**
   * Retrieves all branches from Firestore.
   * @returns An array of all branches.
   * @throws RepositoryError if the retrieval fails.
   */
  async getAllBranches(): Promise<any[]> {
    try {
      const snapshot: QuerySnapshot = await db.collection(this.collectionName).get();
      return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data?.createdAt ? (data.createdAt as Timestamp).toDate() : null,
        };
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to fetch all branches: ${errorMessage}`);
    }
  }

  /**
   * Updates an existing branch in Firestore.
   * @param id - The ID of the branch to update.
   * @param data - The new data for the branch.
   * @throws RepositoryError if the update fails.
   */
  async updateBranch(id: string, data: any): Promise<void> {
    try {
      const updatedData = { ...data, updatedAt: FieldValue.serverTimestamp() };
      await db.collection(this.collectionName).doc(id).update(updatedData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to update branch: ${errorMessage}`);
    }
  }

  /**
   * Deletes a branch from Firestore.
   * @param id - The ID of the branch to delete.
   * @throws RepositoryError if the deletion fails.
   */
  async deleteBranch(id: string): Promise<void> {
    try {
      await db.collection(this.collectionName).doc(id).delete();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to delete branch: ${errorMessage}`);
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
      const snapshot: QuerySnapshot = await db
        .collection(this.employeesCollection)
        .where("branchId", "==", branchId)
        .get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to fetch employees by branch: ${errorMessage}`);
    }
  }
}