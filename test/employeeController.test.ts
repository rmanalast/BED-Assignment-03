// src/tests/employeeController.test.ts

import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";

// Mocking the service methods
jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // Sample employee object to use in tests
    const sampleEmployee = {
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: "1",
    };

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    // Test Create
    it("should handle creating an employee", async () => {
        const newEmployee = { ...sampleEmployee, id: "1" };
        (employeeService.createEmployee as jest.Mock).mockResolvedValue(newEmployee);

        await employeeController.createEmployee(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee created",
            data: newEmployee,
        });
    });

    // Test Get All Employees
    it("should handle retrieving all employees", async () => {
        const employees = [{ id: "1", ...sampleEmployee }];
        (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(employees);

        await employeeController.getAllEmployees(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved",
            data: employees,
        });
    });

    // Test Update Employee
    it("should handle updating an employee", async () => {
        const updatedEmployee = { ...sampleEmployee, position: "Regional Manager" };
        (employeeService.updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);

        await employeeController.updateEmployee(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee updated",
            data: updatedEmployee,
        });
    });

    // Test Delete Employee
    it("should handle deleting an employee", async () => {
        (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(true);

        await employeeController.deleteEmployee(mockReq as Request, mockRes as Response);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Employee deleted" });
    });
});
