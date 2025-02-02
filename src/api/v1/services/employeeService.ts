import { Employee } from "../interfaces/employee";

// Simulated in-memory database
let employees: Employee[] = [];

export const getAllEmployees = async (): Promise<Employee[]> => {
    return employees;
};

export const getEmployeeById = async (id: string): Promise<Employee | undefined> => {
    return employees.find((emp) => emp.id === id);
};

export const createEmployee = async (employee: Employee): Promise<Employee> => {
    const newEmployee = { ...employee, id: new Date().getTime().toString() }; // Generate a unique ID
    employees.push(newEmployee);
    return newEmployee;
};

export const updateEmployee = async (id: string, updates: Partial<Employee>): Promise<Employee | undefined> => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return undefined;

    employees[index] = { ...employees[index], ...updates };
    return employees[index];
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
    const index = employees.findIndex((emp) => emp.id === id);
    if (index === -1) return false;

    employees.splice(index, 1);
    return true;
};
