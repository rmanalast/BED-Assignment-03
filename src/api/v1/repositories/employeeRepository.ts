/**
 * Repository for managing employee-related operations in Firestore.
 */
import { db } from "../../../../config/firebaseConfig";
import { DocumentReference, QuerySnapshot, Timestamp, FieldValue } from "firebase-admin/firestore";
import { RepositoryError } from "../utils/customErrors";

/**
 * Handles Firestore operations for employees.
 */
export class EmployeeRepository {
  private collectionName = "employees";

  /**
   * Creates a new employee in Firestore.
   * @param data - The data for the new employee.
   * @returns The ID of the created employee.
   * @throws RepositoryError if the creation fails.
   */
  async createEmployee(data: any): Promise<string> {
    try {
      const employeeData = { ...data, createdAt: FieldValue.serverTimestamp() };
      const docRef: DocumentReference = await db.collection(this.collectionName).add(employeeData);
      return docRef.id;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to create employee: ${errorMessage}`);
    }
  }

  /**
   * Retrieves an employee by their ID.
   * @param id - The ID of the employee to retrieve.
   * @returns The employee data or null if not found.
   * @throws RepositoryError if the retrieval fails.
   */
  async getEmployeeById(id: string): Promise<any | null> {
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
      throw new RepositoryError(`Failed to get employee by ID: ${errorMessage}`);
    }
  }

  /**
   * Retrieves all employees from Firestore.
   * @returns An array of all employees.
   * @throws RepositoryError if the retrieval fails.
   */
  async getAllEmployees(): Promise<any[]> {
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
      throw new RepositoryError(`Failed to fetch all employees: ${errorMessage}`);
    }
  }

  /**
   * Updates an existing employee in Firestore.
   * @param id - The ID of the employee to update.
   * @param data - The new data for the employee.
   * @throws RepositoryError if the update fails.
   */
  async updateEmployee(id: string, data: any): Promise<void> {
    try {
      const updatedData = { ...data, updatedAt: FieldValue.serverTimestamp() };
      await db.collection(this.collectionName).doc(id).update(updatedData);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to update employee: ${errorMessage}`);
    }
  }

  /**
   * Deletes an employee from Firestore.
   * @param id - The ID of the employee to delete.
   * @throws RepositoryError if the deletion fails.
   */
  async deleteEmployee(id: string): Promise<void> {
    try {
      await db.collection(this.collectionName).doc(id).delete();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to delete employee: ${errorMessage}`);
    }
  }

  /**
   * Retrieves employees associated with a specific department.
   * @param department - The name of the department to fetch employees for.
   * @returns An array of employees associated with the department.
   * @throws RepositoryError if the retrieval fails.
   */
  async getEmployeesByDepartment(department: string): Promise<any[]> {
    try {
      const snapshot: QuerySnapshot = await db
        .collection(this.collectionName)
        .where("department", "==", department)
        .get();
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      throw new RepositoryError(`Failed to fetch employees by department: ${errorMessage}`);
    }
  }
}