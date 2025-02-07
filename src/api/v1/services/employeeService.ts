/**
 * Service functions for managing employees and their related operations.
 * Includes functions for creating, retrieving, updating, and deleting employees,
 * as well as retrieving employees by department.
 */
import { Employee } from "../interfaces/employee";
import { sampleEmployees } from "../sample data/employeeData";
import { Branch } from "../interfaces/branch";
import { sampleBranches } from "../sample data/branchData";

const branches: Branch[] = [...sampleBranches];
const employees: Employee[] = [...sampleEmployees];

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
 * @returns {Employee | null} The found employee or null if not found.
 */
export const getEmployeeById = (id: string): Employee | null => {
    return employees.find(employee => employee.id === id) || null;
};

/**
 * Creates a new employee and adds them to the employees list.
 * @param {Omit<Employee, 'id'>} employee - The employee details without an ID.
 * @returns {Promise<Employee>} The newly created employee.
 */
export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Updates an employee by their ID.
 * @param {string} id - The ID of the employee.
 * @param {Partial<Employee>} updatedEmployee - The updated employee details.
 * @returns {Promise<Employee | null>} The updated employee or null if not found.
 */
export const updateEmployee = async (
    id: string,
    updatedEmployee: Partial<Employee>
): Promise<Employee | null> => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) return null;
    employees[index] = { ...employees[index], ...updatedEmployee };
    return employees[index];
};

/**
 * Deletes an employee by their ID.
 * @param {string} id - The ID of the employee.
 * @returns {Promise<boolean>} True if deleted, false if not found.
 */
export const deleteEmployee = async (id: string): Promise<boolean> => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) return false;
    employees.splice(index, 1);
    return true;
};

/**
 * Retrieves all employees in a specific department.
 * @param {string} department - The department name.
 * @returns {Promise<Employee[]>} An array of employees belonging to the specified department.
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.department === department);
};
