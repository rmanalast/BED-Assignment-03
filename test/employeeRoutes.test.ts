import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    createEmployee: jest.fn((req, res) => res.status(201).json({ message: "Employee created", data: req.body })),
    getAllEmployees: jest.fn((req, res) => res.status(200).json({ message: "Employees retrieved", data: [] })),
    getEmployeeById: jest.fn((req, res) => res.status(200).json({ message: "Employee found", data: {} })),
    updateEmployee: jest.fn((req, res) => res.status(200).json({ message: "Employee updated", data: req.body })),
    deleteEmployee: jest.fn((req, res) => res.status(200).json({ message: "Employee deleted" })),
}));

describe("Employee Directory API", () => {
    const sampleEmployee = {
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: "1",
    };

    // Test Create - POST /employees
    it("should call createEmployee controller", async () => {
        await request(app).post("/api/v1/employees").send(sampleEmployee);
        expect(employeeController.createEmployee).toHaveBeenCalled();
    });

    // Test Get All Employees - GET /employees
    it("should call getAllEmployees controller", async () => {
        await request(app).get("/api/v1/employees");
        expect(employeeController.getAllEmployees).toHaveBeenCalled();
    });

    // Test Get Employee by ID - GET /employees/:id
    it("should call getEmployeeById controller", async () => {
        await request(app).get(`/api/v1/employees/1`);
        expect(employeeController.getEmployeeById).toHaveBeenCalled();
    });

    // Test Update Employee - PUT /employees/:id
    it("should call updateEmployee controller", async () => {
        await request(app).put(`/api/v1/employees/1`).send({ position: "Regional Manager" });
        expect(employeeController.updateEmployee).toHaveBeenCalled();
    });

    // Test Delete Employee - DELETE /employees/:id
    it("should call deleteEmployee controller", async () => {
        await request(app).delete(`/api/v1/employees/1`);
        expect(employeeController.deleteEmployee).toHaveBeenCalled();
    });
});

describe("Branch Routes - Logical Operations", () => {
    
    //
    it("should retrieve all employees for a given branch", async () => {
        const branchId = "1";
        const res = await request(app).get(`/api/v1/branches/${branchId}/employees`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Employees retrieved");
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    // 
    it("should retrieve all employees for a given department", async () => {
        const departmentId = "1";
        const res = await request(app).get(`/api/v1/branches/department/${departmentId}/employees`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("message", "Employees retrieved");
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});
