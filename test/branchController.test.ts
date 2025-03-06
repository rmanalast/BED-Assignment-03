import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService", () => ({
    createBranch: jest.fn(),
    getAllBranches: jest.fn(),
    getBranchById: jest.fn(),
    updateBranch: jest.fn(),
    deleteBranch: jest.fn(),
    getEmployeesByBranch: jest.fn(),
}));

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();
    });

    const sampleBranch = {
        id: "1",
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022",
    };

    const sampleEmployee = {
        id: "1",
        name: "Alice Johnson",
        position: "Branch Manager",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148",
        branchId: "1",
    };

    // Test Create Branch
    it("should create a new branch", async () => {
        (branchService.createBranch as jest.Mock).mockResolvedValue(sampleBranch);
        mockReq.body = { name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022" };

        await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch Created",
            data: sampleBranch,
            status: "success",
        });
    });

    // Test Get All Branches
    it("should retrieve all branches", async () => {
        (branchService.getAllBranches as jest.Mock).mockResolvedValue([sampleBranch]);

        await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branches Retrieved",
            data: [sampleBranch],
            status: "success",
        });
    });

    // Test Get Branch by ID
    it("should retrieve a branch by ID", async () => {
        (branchService.getBranchById as jest.Mock).mockResolvedValue(sampleBranch);
        mockReq.params = { id: "1" };

        await branchController.getBranchById(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch Retrieved",
            data: sampleBranch,
            status: "success",
        });
    });

    // Test Update Branch
    it("should update a branch", async () => {
        const updatedBranch = { ...sampleBranch, address: "456 Updated St" };
        (branchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);
        mockReq.params = { id: "1" };
        mockReq.body = { address: "456 Updated St" };

        await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch Updated",
            data: updatedBranch,
            status: "success", 
        });
    });

    // Test Delete Branch
    it("should delete a branch", async () => {
        (branchService.deleteBranch as jest.Mock).mockResolvedValue(true);
        mockReq.params = { id: "1" };

        await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch Deleted",
            status: "success",
        });
    });

    // Test Get All Employees for a Branch
    it("should retrieve all employees for a given branch", async () => {
        const sampleEmployees = [sampleEmployee];
        (branchService.getEmployeesByBranch as jest.Mock).mockResolvedValue(sampleEmployees);
        mockReq.params = { branchId: "1" };

        await branchController.getEmployeesByBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees Retrieved",
            data: sampleEmployees,
            status: "success",
        });
    });
});