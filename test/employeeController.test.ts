import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { EmployeeService } from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/interfaces/employee";

// Mock the EmployeeService class
jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;
    let employeeServiceMock: jest.Mocked<EmployeeService>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();

        // Create an instance of the mocked EmployeeService
        employeeServiceMock = new EmployeeService() as jest.Mocked<EmployeeService>;
    });

    // Sample employee data
    const sampleEmployee: Employee = {
        id: "1",
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: "1"
    };

    // Test Create Employee
    it("should create an employee", async () => {
        employeeServiceMock.createEmployee.mockResolvedValue(sampleEmployee);
        mockReq.body = sampleEmployee;

        await employeeController.createEmployee(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee created",
            data: sampleEmployee,
        });
    });

    // Test Get All Employees
    it("should retrieve all employees", async () => {
        employeeServiceMock.getAllEmployees.mockResolvedValue([sampleEmployee]);

        await employeeController.getAllEmployees(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved",
            data: [sampleEmployee],
        });
    });

    // Test Update Employee
    it("should update an employee", async () => {
        const updatedEmployee = { ...sampleEmployee, name: "Raven Manalastas" };
        employeeServiceMock.updateEmployee.mockResolvedValue(updatedEmployee);
        mockReq.params = { id: "1" };
        mockReq.body = { name: "Raven Manalastas" };

        await employeeController.updateEmployee(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee updated",
            data: updatedEmployee,
        });
    });

    // Test Delete Employee
    it("should delete an employee", async () => {
        employeeServiceMock.deleteEmployee.mockResolvedValue("Employee deleted successfully");
        mockReq.params = { id: "1" };

        await employeeController.deleteEmployee(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Employee deleted" });
    });

    // Test Get Employees by Department
    it("should retrieve employees by department", async () => {
        const departmentEmployees = [sampleEmployee];
        employeeServiceMock.getEmployeesByDepartment.mockResolvedValue(departmentEmployees);
        mockReq.params = { department: "Management" };

        await employeeController.getEmployeesByDepartment(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved",
            data: departmentEmployees,
        });
    });
});
