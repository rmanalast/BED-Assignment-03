import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import { BranchService } from "../src/api/v1/services/branchService"; // Import the class

jest.mock("../src/api/v1/services/branchService"); // Mock the entire service file

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;
    let branchServiceInstance: jest.Mocked<BranchService>; // Define the mocked instance

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockNext = jest.fn();

        // Create a mocked instance of BranchService
        branchServiceInstance = new BranchService() as jest.Mocked<BranchService>;

        // Mock the methods on the BranchService instance
        branchServiceInstance.createBranch = jest.fn();
        branchServiceInstance.getAllBranches = jest.fn();
        branchServiceInstance.getBranchById = jest.fn();
        branchServiceInstance.updateBranch = jest.fn();
        branchServiceInstance.deleteBranch = jest.fn();
        branchServiceInstance.getEmployeesByBranch = jest.fn();
    });

    // Sample data
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
        branchServiceInstance.createBranch.mockResolvedValue(sampleBranch);
        mockReq.body = { name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022" };

        await branchController.createBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch created",
            data: sampleBranch,
        });
    });

    // Test Get All Branches
    it("should retrieve all branches", async () => {
        branchServiceInstance.getAllBranches.mockResolvedValue([sampleBranch]);

        await branchController.getAllBranches(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branches retrieved",
            data: [sampleBranch],
        });
    });

    // Test Get Branch by ID
    it("should retrieve a branch by ID", async () => {
        branchServiceInstance.getBranchById.mockResolvedValue(sampleBranch);
        mockReq.params = { id: "1" };

        await branchController.getBranchById(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch found",
            data: sampleBranch,
        });
    });

    // Test Update Branch
    it("should update a branch", async () => {
        const updatedBranch = { ...sampleBranch, address: "456 Updated St" };
        branchServiceInstance.updateBranch.mockResolvedValue(updatedBranch);
        mockReq.params = { id: "1" };
        mockReq.body = { address: "456 Updated St" };

        await branchController.updateBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Branch updated",
            data: updatedBranch,
        });
    });

    // Test Delete Branch
    it("should delete a branch", async () => {
        branchServiceInstance.deleteBranch.mockResolvedValue('Branch with ID "1" deleted successfully.');

        mockReq.params = { id: "1" };

        await branchController.deleteBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Branch deleted" });
    });

    // Test Get All Employees for a Branch
    it("should retrieve all employees for a given branch", async () => {
        const sampleEmployees = [sampleEmployee];
        branchServiceInstance.getEmployeesByBranch.mockResolvedValue(sampleEmployees);
        mockReq.params = { branchId: "1" };

        await branchController.getEmployeesByBranch(mockReq as Request, mockRes as Response, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved",
            data: sampleEmployees,
        });
    });
});