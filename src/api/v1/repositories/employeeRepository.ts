/**
 * Repository for managing employee-related operations in Firestore.
 */
import { db } from "../../../../config/firebaseConfig";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { RepositoryError } from "../errors/errors";
import {
    getErrorMessage,
    getErrorCode,
    getFirebaseErrorStatusCode,
} from "../utils/customErrors";

import { Employee } from "../interfaces/employee";

/**
 * Repository for managing employee-related operations in Firestore.
 */
export class EmployeeRepository {
    private collectionName = "employees";

    /**
     * Creates a new employee in Firestore.
     * @param data - The data for the new employee.
     * @returns The ID of the created employee.
     * @throws RepositoryError if the creation fails.
     */
    async createEmployee(data: Employee): Promise<string> {
        try {
            const employeeData = { ...data, createdAt: FieldValue.serverTimestamp() };
            const docRef = await db.collection(this.collectionName).add(employeeData);
            return docRef.id;
        } catch (error) {
            throw new RepositoryError(
                `Failed to create employee: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Retrieves an employee by their ID.
     * @param id - The ID of the employee to retrieve.
     * @returns The employee data or null if not found.
     * @throws RepositoryError if the retrieval fails.
     */
    async getEmployeeById(id: string): Promise<Employee | null> {
        try {
            const doc = await db.collection(this.collectionName).doc(id).get();
            if (!doc.exists) return null;
            const data = doc.data() as Employee;
            return {
                ...data,
                createdAt: data?.createdAt ? (data.createdAt as unknown as Timestamp).toDate() : null,
            };
        } catch (error) {
            throw new RepositoryError(
                `Failed to get employee by ID: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Retrieves all employees from Firestore.
     * @returns An array of all employees.
     * @throws RepositoryError if the retrieval fails.
     */
    async getAllEmployees(): Promise<Employee[]> {
        try {
            const snapshot = await db.collection(this.collectionName).get();
            return snapshot.docs.map((doc) => {
                const data = doc.data() as Employee;
                return {
                    ...data,
                    createdAt: data?.createdAt ? (data.createdAt as unknown as Timestamp).toDate() : null, // Convert Timestamp to Date
                };
            });
        } catch (error) {
            throw new RepositoryError(
                `Failed to fetch all employees: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Updates an existing employee in Firestore.
     * @param id - The ID of the employee to update.
     * @param data - The new data for the employee.
     * @throws RepositoryError if the update fails.
     */
    async updateEmployee(id: string, data: Partial<Employee>): Promise<void> {
        try {
            const updatedData = { ...data, updatedAt: FieldValue.serverTimestamp() };
            await db.collection(this.collectionName).doc(id).update(updatedData);
        } catch (error) {
            throw new RepositoryError(
                `Failed to update employee: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
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
            throw new RepositoryError(
                `Failed to delete employee: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }

    /**
     * Retrieves employees associated with a specific department.
     * @param department - The name of the department to fetch employees for.
     * @returns An array of employees associated with the department.
     * @throws RepositoryError if the retrieval fails.
     */
    async getEmployeesByDepartment(department: string): Promise<Employee[]> {
        try {
            const snapshot = await db
                .collection(this.collectionName)
                .where("department", "==", department)
                .get();
            return snapshot.docs.map((doc) => {
                const data = doc.data() as Employee;
                return {
                    ...data,
                    createdAt: data?.createdAt ? (data.createdAt as unknown as Timestamp).toDate() : null,
                };
            });
        } catch (error) {
            throw new RepositoryError(
                `Failed to fetch employees by department: ${getErrorMessage(error)}`,
                getErrorCode(error),
                getFirebaseErrorStatusCode(error)
            );
        }
    }
}
