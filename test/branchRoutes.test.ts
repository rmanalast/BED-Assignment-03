import request from "supertest";
import app from "../src/app"; 
import * as branchService from "../src/api/v1/services/branchService";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Routes", () => {
    const sampleBranch = {
        id: "1",
        name: "Vancouver Branch",
        address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
        phone: "604-456-0022"
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test Create Branch Route
    it("should create a new branch", async () => {
        (branchService.createBranch as jest.Mock).mockResolvedValue(sampleBranch);

        const res = await request(app)
            .post("/api/v1/branches")
            .send({ name: "Vancouver Branch", address: "1300 Burrard St, Vancouver, BC, V6Z 2C7", phone: "604-456-0022" });

        expect(res.status).toBe(201);
        expect(res.body).toEqual({
            message: "Branch created",
            data: sampleBranch,
        });
    });

    // Test Get All Branches Route
    it("should retrieve all branches", async () => {
        (branchService.getAllBranches as jest.Mock).mockResolvedValue([sampleBranch]);

        const res = await request(app).get("/api/v1/branches");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: "Branches retrieved",
            data: [sampleBranch],
        });
    });

    // Test Get Branch by ID Route
    it("should retrieve a branch by ID", async () => {
        (branchService.getBranchById as jest.Mock).mockResolvedValue(sampleBranch);

        const res = await request(app).get("/api/v1/branches/1");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: "Branch found",
            data: sampleBranch,
        });
    });

    // Test Update Branch Route
    it("should update a branch", async () => {
        const updatedBranch = { ...sampleBranch, address: "456 Updated St" };
        (branchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

        const res = await request(app)
            .put("/api/v1/branches/1")
            .send({ address: "456 Updated St" });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            message: "Branch updated",
            data: updatedBranch,
        });
    });

    // Test Delete Branch Route
    it("should delete a branch", async () => {
        (branchService.deleteBranch as jest.Mock).mockResolvedValue(true);

        const res = await request(app).delete("/api/v1/branches/1");

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ message: "Branch deleted" });
    });
});