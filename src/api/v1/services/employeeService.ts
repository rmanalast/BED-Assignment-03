import { Employee } from "../interfaces/employee";

// Simulated in-memory database
let employees: Employee[] = [];

/**
 * Get all employees from the in-memory storage.
 * @returns A list of all employees.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

/**
 * Get a specific employee by their ID.
 * @param id The ID of the employee to be retrieved.
 * @returns The employee with the specified ID, or undefined if not found.
 */
export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
    return employees.find((emp) => emp.id === id);
};

/**
 * Create a new employee and add it to the in-memory employee storage.
 * @param employee The employee object to be created.
 * @returns The created employee with an assigned unique ID.
 */
export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const newEmployee = { ...employee, id: new Date().getTime().toString() }; // Generate a unique ID
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Update the details of a specific employee by their ID.
 * @param id The ID of the employee to be updated.
 * @param updates The partial employee object with the updates to be applied.
 * @returns The updated employee, or undefined if no employee with the specified ID exists.
 */
export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee | undefined> => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return undefined;

    employees[index] = { ...employees[index], ...updates };
    return employees[index];
};

/**
 * Delete an employee by their ID from the in-memory storage.
 * @param id The ID of the employee to be deleted.
 * @returns A boolean indicating whether the employee was successfully deleted.
 */
export const deleteEmployee = async (id: string): Promise<boolean> => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    employees.splice(index, 1);
    return true;
};