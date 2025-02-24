import * as employeeService from '../src/api/v1/services/employeeService';
import { EmployeeRepository } from '../src/api/v1/repositories/employeeRepository';
import { ServiceError, ValidationError, NotFoundError } from '../src/api/v1/utils/customErrors';

jest.mock('../src/api/v1/repositories/employeeRepository');

const mockEmployeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
const service = new employeeService.EmployeeService(mockEmployeeRepository);

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an employee successfully", async () => {
        mockEmployeeRepository.createEmployee.mockResolvedValue("1");

        const employeeData = {
            name: "Jane Doe",
            position: "Assistant Manager",
            branchId: "1",
            email: "janedoe@company.com",
            phone: "604-765-4321"
        };

        const employee = await service.createEmployee(employeeData);

        expect(employee).toEqual({ ...employeeData, id: "1" });
        expect(mockEmployeeRepository.createEmployee).toHaveBeenCalledWith(employeeData);
    });

    it("should throw a ValidationError if required fields are missing", async () => {
        await expect(service.createEmployee({ name: "Only Name" }))
            .rejects.toThrow(ValidationError);
    });

    it("should retrieve all employees", async () => {
        const sampleEmployee = { id: "1", name: "Alice Johnson", position: "Branch Manager" };
        mockEmployeeRepository.getAllEmployees.mockResolvedValue([sampleEmployee]);

        const employees = await service.getAllEmployees();

        expect(employees).toEqual([sampleEmployee]);
        expect(mockEmployeeRepository.getAllEmployees).toHaveBeenCalled();
    });

    it("should retrieve an employee by ID", async () => {
        const sampleEmployee = { id: "1", name: "Alice Johnson", position: "Branch Manager" };
        mockEmployeeRepository.getEmployeeById.mockResolvedValue(sampleEmployee);

        const employee = await service.getEmployeeById("1");

        expect(employee).toEqual(sampleEmployee);
        expect(mockEmployeeRepository.getEmployeeById).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError if employee ID does not exist", async () => {
        mockEmployeeRepository.getEmployeeById.mockResolvedValue(null);

        await expect(service.getEmployeeById("2"))
            .rejects.toThrow(NotFoundError);
    });

    it("should update an employee successfully", async () => {
        const sampleEmployee = { id: "1", name: "Alice Johnson", position: "Branch Manager" };
        mockEmployeeRepository.getEmployeeById.mockResolvedValue(sampleEmployee);
        mockEmployeeRepository.updateEmployee.mockResolvedValue();

        const updatedEmployee = await service.updateEmployee("1", { phone: "604-111-2222" });

        expect(updatedEmployee).toEqual({ ...sampleEmployee, phone: "604-111-2222" });
        expect(mockEmployeeRepository.updateEmployee).toHaveBeenCalledWith("1", { phone: "604-111-2222" });
    });

    it("should delete an employee successfully", async () => {
        const sampleEmployee = { id: "1", name: "Alice Johnson", position: "Branch Manager" };
        mockEmployeeRepository.getEmployeeById.mockResolvedValue(sampleEmployee);
        mockEmployeeRepository.deleteEmployee.mockResolvedValue();

        const message = await service.deleteEmployee("1");

        expect(message).toBe('Employee with ID "1" deleted successfully.');
        expect(mockEmployeeRepository.deleteEmployee).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError if deleting a non-existing employee", async () => {
        mockEmployeeRepository.getEmployeeById.mockResolvedValue(null);

        await expect(service.deleteEmployee("2"))
            .rejects.toThrow(NotFoundError);
    });

    it("should retrieve employees by department", async () => {
        const sampleEmployee = { id: "1", name: "John Doe", position: "Developer", departmentId: "D1" };
        mockEmployeeRepository.getEmployeesByDepartment.mockResolvedValue([sampleEmployee]);
    
        const departmentId = "D1";
        const employees = await service.getEmployeesByDepartment(departmentId);
    
        expect(employees).toEqual([sampleEmployee]);
        expect(mockEmployeeRepository.getEmployeesByDepartment).toHaveBeenCalledWith(departmentId);
    });
});