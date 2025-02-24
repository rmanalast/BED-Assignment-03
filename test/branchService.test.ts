import { BranchService } from "../src/api/v1/services/branchService";
import { BranchRepository } from "../src/api/v1/repositories/branchRepository";
import { ValidationError, NotFoundError } from "../src/api/v1/utils/customErrors";

// Mock Firestore Repository
jest.mock("../src/api/v1/repositories/branchRepository");

const mockBranchRepository = new BranchRepository() as jest.Mocked<BranchRepository>;
const branchService = new BranchService(mockBranchRepository);

describe("Branch Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a branch successfully", async () => {
        mockBranchRepository.createBranch.mockResolvedValue("1");

        const branchData = {
            name: "Main Branch",
            address: "123 Street",
            phone: "123-456-7890"
        };

        const branch = await branchService.createBranch(branchData);

        expect(branch).toEqual({ ...branchData, id: "1" });
        expect(mockBranchRepository.createBranch).toHaveBeenCalledWith(branchData);
    });

    it("should throw a ValidationError if required fields are missing", async () => {
        await expect(branchService.createBranch({ name: "Only Name" }))
            .rejects.toThrow(ValidationError);
    });

    it("should retrieve all branches", async () => {
        const sampleBranch = { id: "1", name: "Branch A", address: "123 St", phone: "123-456-7890" };
        mockBranchRepository.getAllBranches.mockResolvedValue([sampleBranch]);

        const branches = await branchService.getAllBranches();

        expect(branches).toEqual([sampleBranch]);
        expect(mockBranchRepository.getAllBranches).toHaveBeenCalled();
    });

    it("should retrieve a branch by ID", async () => {
        const sampleBranch = { id: "1", name: "Branch A", address: "123 St", phone: "123-456-7890" };
        mockBranchRepository.getBranchById.mockResolvedValue(sampleBranch);

        const branch = await branchService.getBranchById("1");

        expect(branch).toEqual(sampleBranch);
        expect(mockBranchRepository.getBranchById).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError if branch ID does not exist", async () => {
        mockBranchRepository.getBranchById.mockResolvedValue(null);

        await expect(branchService.getBranchById("2")).rejects.toThrow(NotFoundError);
    });

    it("should update a branch successfully", async () => {
        const sampleBranch = { id: "1", name: "Branch A", address: "Old Address", phone: "123-456-7890" };
        mockBranchRepository.getBranchById.mockResolvedValue(sampleBranch);
        mockBranchRepository.updateBranch.mockResolvedValue();

        const updatedBranch = await branchService.updateBranch("1", { address: "New Address" });

        expect(updatedBranch).toEqual({ ...sampleBranch, id: "1", address: "New Address" });
        expect(mockBranchRepository.updateBranch).toHaveBeenCalledWith("1", { address: "New Address" });
    });

    it("should delete a branch successfully", async () => {
        const sampleBranch = { id: "1", name: "Branch A", address: "123 St", phone: "123-456-7890" };
        mockBranchRepository.getBranchById.mockResolvedValue(sampleBranch);
        mockBranchRepository.deleteBranch.mockResolvedValue();

        const message = await branchService.deleteBranch("1");

        expect(message).toBe('Branch with ID "1" deleted successfully.');
        expect(mockBranchRepository.deleteBranch).toHaveBeenCalledWith("1");
    });

    it("should throw NotFoundError if deleting a non-existing branch", async () => {
        mockBranchRepository.getBranchById.mockResolvedValue(null);

        await expect(branchService.deleteBranch("2")).rejects.toThrow(NotFoundError);
    });
});