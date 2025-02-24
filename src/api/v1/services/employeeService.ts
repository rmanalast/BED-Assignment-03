import { Employee } from "../interfaces/employee";
import {
    createDocument,
    getDocuments,
    getDocumentsByFieldValue,
    updateDocument,
    deleteDocument
} from "../utils/firestoreUtils";
import { NotFoundError, ServiceError, ValidationError } from "../utils/customErrors";

const COLLECTION = "employees";

/**
 * @description Create a new employee.
 * @param {Partial<Employee>} employee - The employee data.
 * @returns {Promise<Employee>}
 * @throws {ValidationError} If required fields are missing.
 */
export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
    if (!employee.name || !employee.position || !employee.branchId || !employee.email || !employee.phone) {
        throw new ValidationError("All fields (name, position, email, phone, branchId) are required.");
    }

    try {
        const id = await createDocument(COLLECTION, employee);
        return { id, ...employee } as Employee;
    } catch (error) {
        throw new ServiceError(`Failed to create employee: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};

/**
 * @description Get all employees.
 * @returns {Promise<Employee[]>}
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
    } catch (error) {
        throw new ServiceError(`Failed to fetch employees: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};

/**
 * @description Get an employee by ID.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<Employee>}
 * @throws {NotFoundError} If the employee is not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    try {
        const snapshot = await getDocumentsByFieldValue(COLLECTION, "id", id);
        if (snapshot.empty) {
            throw new NotFoundError(`Employee with ID "${id}" not found.`);
        }

        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as Employee;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new ServiceError(`Failed to fetch employee (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};

/**
 * @description Update an existing employee.
 * @param {string} id - The ID of the employee.
 * @param {Partial<Employee>} employee - The updated employee data.
 * @returns {Promise<Employee>}
 * @throws {NotFoundError} If the employee is not found.
 */
export const updateEmployee = async (id: string, employee: Partial<Employee>): Promise<Employee> => {
    try {
        const snapshot = await getDocumentsByFieldValue(COLLECTION, "id", id);
        if (snapshot.empty) {
            throw new NotFoundError(`Employee with ID "${id}" not found.`);
        }

        await updateDocument(COLLECTION, id, employee);
        return { id, ...employee } as Employee;
    } catch (error) {
        throw new ServiceError(`Failed to update employee (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};

/**
 * @description Delete an employee.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<boolean>}
 * @throws {NotFoundError} If the employee is not found.
 */
export const deleteEmployee = async (id: string): Promise<boolean> => {
    try {
        const snapshot = await getDocumentsByFieldValue(COLLECTION, "id", id);
        if (snapshot.empty) {
            throw new NotFoundError(`Employee with ID "${id}" not found.`);
        }

        await deleteDocument(COLLECTION, id);
        return true;
    } catch (error) {
        throw new ServiceError(`Failed to delete employee (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};

/**
 * @description Get employees by department.
 * @param {string} departmentId - The department ID.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByDepartment = async (departmentId: string): Promise<Employee[]> => {
    try {
        const snapshot = await getDocumentsByFieldValue(COLLECTION, "department", departmentId);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Employee[];
    } catch (error) {
        throw new ServiceError(`Failed to fetch employees for department (${departmentId}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
    }
};