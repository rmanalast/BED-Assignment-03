/**
 * Service functions for managing employees and their related operations.
 * Includes functions for creating, retrieving, updating, and deleting employees,
 * as well as retrieving employees by department.
 */
import { Employee } from "../interfaces/employee";
import { sampleEmployees } from "../sample data/employeeData";
import { Branch } from "../interfaces/branch";
import { sampleBranches } from "../sample data/branchData";

const branches: Branch[] = [];
const employees: Employee[] = [];

/**
 * Retrieves all employees.
 * @returns {Promise<Employee[]>} An array of all employees.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

/**
 * Retrieves an employee by their ID.
 * @param {string} id - The ID of the employee.
 * @param {any} body - Additional request data (if applicable).
 * @returns {Employee[]} An array containing the found employee or an empty array if not found.
 */
export const getEmployeeById =  (id: string, body: any): Employee[] => {
    const foundEmployee = employees.find(employee => employee.id === id);
    return foundEmployee ? [foundEmployee] : [];
};

/**
 * Creates a new employee and adds them to the employees list.
 * @param {Object} employee - The employee details (name, position, department, email, phone, branchId).
 * @returns {Promise<Employee>} The newly created employee.
 */
export const createEmployee = async (employee: {
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
}): Promise<Employee> => {
    const newEmployee: Employee =  { id: Date.now().toString(), ...employee};
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Updates an employee by their ID.
 * @param {string} id - The ID of the employee.
 * @param {Object} updatedEmployee - The updated employee details (name, position, department, email, phone, branchId).
 * @returns {Promise<Employee>} The updated employee.
 * @throws {Error} If the employee with the given ID is not found.
 */
export const updateEmployee = async (
    id: string,
    updatedEmployee: {
        name: string; 
        position: string; 
        department: string;
        email: string;
        phone: string;
        branchId: string;
    }
): Promise<Employee> => {
    const index: number = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    employees[index] = { id, ...updatedEmployee };
    return employees[index]; 
};

/**
 * Deletes an employee by their ID.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<void>} Resolves when the employee is deleted.
 * @throws {Error} If the employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const index: number = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID ${id} not found`);
    }
    employees.splice(index, 1);
};

/**
 * Retrieves all employees in a specific department.
 * @param {string} department - The department name.
 * @returns {Promise<Employee[]>} An array of employees belonging to the specified department.
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.department === department);
};