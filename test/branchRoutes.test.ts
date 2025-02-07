import request from "supertest";
import app from "../src/app";
import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    getEmployeesByBranch,
} from "../src/api/v1/controllers/branchController";

// Mock the controller functions
jest.mock("../src/api/v1/controllers/branchController", () => ({
    createBranch: jest.fn((req, res) => res.status(201).send()),
    getAllBranches: jest.fn((req, res) => res.status(200).send()),
    getBranchById: jest.fn((req, res) => res.status(200).send()),
    updateBranch: jest.fn((req, res) => res.status(200).send()),
    deleteBranch: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const sampleBranch = {
        id: "1", 
        name: "Vancouver Branch", 
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", 
        phone: "604-456-0022" 
    };

    describe("GET /api/v1/branches", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches").send(sampleBranch);
            expect(getAllBranches).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches", () => {
        it("should call createBranch controller", async () => {
            const mockBranch = {
                name: "Vancouver Branch",
                address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
                phone: "604-456-0022",
            };

            await request(app).post("/api/v1/branches").send(mockBranch);
            expect(createBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("should call getBranchById controller", async () => {
            await request(app).get("/api/v1/branches/1");
            expect(getBranchById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller", async () => {
            const mockUpdate = { address: "456 Updated St" };
            await request(app).put("/api/v1/branches/1").send(mockUpdate);
            expect(updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller", async () => {
            await request(app).delete("/api/v1/branches/1");
            expect(deleteBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id/employees", () => {
        it("should call getEmployeesByBranch controller", async () => {
            await request(app).get("/api/v1/branches/1/employees");
            expect(getEmployeesByBranch).toHaveBeenCalled();
        });
    });
});
