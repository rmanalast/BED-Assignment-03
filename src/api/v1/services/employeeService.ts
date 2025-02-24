import { Employee } from "../interfaces/employee";
import { EmployeeRepository } from "../repositories/employeeRepository";
import { ServiceError, NotFoundError, ValidationError } from "../utils/customErrors";

/**
 * Service class to manage employees and their operations.
 * Includes functions for creating, retrieving, updating, and deleting employees.
 */
export class EmployeeService {
    private employeeRepository: EmployeeRepository;

    constructor(employeeRepository?: EmployeeRepository) {
        this.employeeRepository = employeeRepository || new EmployeeRepository();
    }

    /**
     * Creates a new employee.
     * @param {Partial<Employee>} employee - The employee details (name, position, email, phone, branchId).
     * @returns {Promise<Employee>} The newly created employee.
     * @throws {ValidationError} If required fields are missing.
     */
    async createEmployee(employee: Partial<Employee>): Promise<Employee> {
        if (!employee.name || !employee.position || !employee.branchId || !employee.email || !employee.phone) {
            throw new ValidationError("All fields (name, position, email, phone, branchId) are required.");
        }

        try {
            const employeeId = await this.employeeRepository.createEmployee(employee);
            return { id: employeeId, ...employee } as Employee;
        } catch (error) {
            throw new ServiceError(`Failed to create employee: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves all employees.
     * @returns {Promise<Employee[]>} An array of all employees.
     * @throws {ServiceError} If retrieval fails.
     */
    async getAllEmployees(): Promise<Employee[]> {
        try {
            return await this.employeeRepository.getAllEmployees();
        } catch (error) {
            throw new ServiceError(`Failed to fetch employees: ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves an employee by its ID.
     * @param {string} id - The ID of the employee.
     * @returns {Promise<Employee>} The found employee.
     * @throws {NotFoundError} If the employee is not found.
     * @throws {ServiceError} If retrieval fails.
     */
    async getEmployeeById(id: string): Promise<Employee> {
        try {
            const employee = await this.employeeRepository.getEmployeeById(id);
            if (!employee) {
                throw new NotFoundError(`Employee with ID "${id}" not found.`);
            }
            return employee;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ServiceError(`Failed to fetch employee by ID (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Updates an employee by its ID.
     * @param {string} id - The ID of the employee.
     * @param {Partial<Employee>} updatedEmployee - The updated employee details.
     * @returns {Promise<Employee>} The updated employee.
     * @throws {NotFoundError} If the employee does not exist.
     * @throws {ServiceError} If the update fails.
     */
    async updateEmployee(id: string, updatedEmployee: Partial<Employee>): Promise<Employee> {
        try {
            const existingEmployee = await this.employeeRepository.getEmployeeById(id);
            if (!existingEmployee) {
                throw new NotFoundError(`Employee with ID "${id}" not found.`);
            }

            await this.employeeRepository.updateEmployee(id, updatedEmployee);
            return { id, ...existingEmployee, ...updatedEmployee };
        } catch (error) {
            throw new ServiceError(`Failed to update employee (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Deletes an employee by its ID.
     * @param {string} id - The ID of the employee.
     * @returns {Promise<string>} A success message.
     * @throws {NotFoundError} If the employee is not found.
     * @throws {ServiceError} If deletion fails.
     */
    async deleteEmployee(id: string): Promise<string> {
        try {
            const existingEmployee = await this.employeeRepository.getEmployeeById(id);
            if (!existingEmployee) {
                throw new NotFoundError(`Employee with ID "${id}" not found.`);
            }

            await this.employeeRepository.deleteEmployee(id);
            return `Employee with ID "${id}" deleted successfully.`;
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            throw new ServiceError(`Failed to delete employee (${id}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }

    /**
     * Retrieves employees for a specific department within a branch.
     * @param {string} departmentId - The department ID.
     * @returns {Promise<Employee[]>} Employees in the specified department.
     * @throws {ServiceError} If retrieval fails.
     */
    async getEmployeesByDepartment(departmentId: string): Promise<Employee[]> {
        try {
            return await this.employeeRepository.getEmployeesByDepartment(departmentId);
        } catch (error) {
            throw new ServiceError(`Failed to fetch employees for department (${departmentId}): ${error instanceof Error ? error.message : "Unknown error occurred."}`);
        }
    }
};