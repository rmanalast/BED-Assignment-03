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
 * @returns {Promise<Employee[]>} List of employees.
 */
export const getAllEmployees = async (): Promise<Employee[]> => employees;

/**
 * Retrieves an employee by their ID.
 * @param {string} id - The employee ID.
 * @returns {Promise<Employee>} The found employee.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const employee = employees.find(employee => employee.id === id);
    if (!employee) {
        throw new Error(`Employee with ID "${id}" not found.`);
    }
    return employee;
};

/**
 * Creates a new employee if their branch exists.
 * @param {Omit<Employee, 'id'>} employee - Employee details.
 * @returns {Promise<Employee>} The new employee.
 */
export const createEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
    if (!employee.name || !employee.department || !employee.branchId) {
        throw new Error("All fields (name, department, branchId) are required.");
    }

    const branchExists = branches.some(branch => branch.id === employee.branchId);
    if (!branchExists) {
        throw new Error(`Branch with ID "${employee.branchId}" does not exist.`);
    }

    const newEmployee: Employee = { id: Date.now().toString(), ...employee };
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Updates an employee by ID.
 * @param {string} id - The employee ID.
 * @param {Partial<Employee>} updatedEmployee - Updated details.
 * @returns {Promise<Employee>} The updated employee.
 */
export const updateEmployee = async (id: string, updatedEmployee: Partial<Employee>): Promise<Employee> => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID "${id}" not found.`);
    }

    employees[index] = { ...employees[index], ...updatedEmployee };
    return employees[index];
};

/**
 * Deletes an employee by ID.
 * @param {string} id - The employee ID.
 * @returns {Promise<string>} Success message.
 */
export const deleteEmployee = async (id: string): Promise<string> => {
    const index = employees.findIndex(employee => employee.id === id);
    if (index === -1) {
        throw new Error(`Employee with ID "${id}" not found.`);
    }

    employees.splice(index, 1);
    return `Employee with ID "${id}" deleted successfully.`;
};

/**
 * Retrieves employees from a specific department.
 * @param {string} department - Department name.
 * @returns {Promise<Employee[]>} Employees in the department.
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    return employees.filter(employee => employee.department.toLowerCase() === department.toLowerCase());
};
