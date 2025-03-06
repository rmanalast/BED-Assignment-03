import {
    createBranch,
    getAllBranches,
    getBranchById,
    updateBranch,
    deleteBranch,
    getEmployeesByBranch
} from "../src/api/v1/services/branchService";
import {
    createDocument,
    getDocuments,
    getDocumentsByFieldValue,
    updateDocument,
    deleteDocument
} from "../src/api/v1/utils/firestoreUtils";

// Mock Firestore Utils
jest.mock("../src/api/v1/utils/firestoreUtils", () => ({
    createDocument: jest.fn(),
    getDocuments: jest.fn(),
    getDocumentsByFieldValue: jest.fn(),
    updateDocument: jest.fn(),
    deleteDocument: jest.fn()
}));

describe("Branch Service", () => {
    const mockBranchData = { name: "Main Branch", address: "123 Street", phone: "123-456-7890" };
    const mockBranchId = "branch123";
    const mockEmployeeData = { id: "emp123", branchId: "branch123", name: "John Doe", role: "Manager" };
    const mockBranch = { id: mockBranchId, ...mockBranchData };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("createBranch", () => {
        it("should create a branch successfully", async () => {
            (createDocument as jest.Mock).mockResolvedValue(mockBranchId);
            
            const result = await createBranch(mockBranchData);

            expect(result).toEqual({ ...mockBranchData, id: mockBranchId });
            expect(createDocument).toHaveBeenCalledWith("branches", mockBranchData);
        });
    });

    describe("getAllBranches", () => {
        it("should retrieve all branches successfully", async () => {
            const mockSnapshot = {
                docs: [
                    { id: "branch1", data: () => mockBranchData },
                    { id: "branch2", data: () => mockBranchData }
                ]
            };
            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

            const result = await getAllBranches();

            expect(result).toEqual([
                { id: "branch1", ...mockBranchData },
                { id: "branch2", ...mockBranchData }
            ]);
            expect(getDocuments).toHaveBeenCalledWith("branches");
        });
    });

    describe("getBranchById", () => {
        it("should retrieve a branch by ID", async () => {
            const mockSnapshot = {
                docs: [{ id: mockBranchId, data: () => mockBranchData }]
            };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            const result = await getBranchById(mockBranchId);

            expect(result).toEqual(mockBranch);
            expect(getDocumentsByFieldValue).toHaveBeenCalledWith("branches", "id", mockBranchId);
        });

        it("should throw an error if branch not found", async () => {
            const mockSnapshot = { empty: true };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            await expect(getBranchById("nonExistentBranch")).rejects.toThrow("Branch with ID \"nonExistentBranch\" not found.");
        });
    });

    describe("updateBranch", () => {
        it("should update a branch successfully", async () => {
            const updatedBranch = { name: "Updated Branch" };
            (updateDocument as jest.Mock).mockResolvedValue(null);

            const result = await updateBranch(mockBranchId, updatedBranch);

            expect(result).toEqual({ id: mockBranchId, ...updatedBranch });
            expect(updateDocument).toHaveBeenCalledWith("branches", mockBranchId, updatedBranch);
        });

        it("should throw an error if branch not found", async () => {
            (updateDocument as jest.Mock).mockRejectedValue(new Error("Branch not found"));

            await expect(updateBranch("nonExistentBranch", { name: "Updated Branch" }))
                .rejects.toThrow("Branch not found");
        });
    });

    describe("deleteBranch", () => {
        it("should delete a branch successfully", async () => {
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue({
                empty: false,
                docs: [{ id: mockBranchId }]
            });
            (deleteDocument as jest.Mock).mockResolvedValue(null);

            const result = await deleteBranch(mockBranchId);

            expect(result).toBe(true);
            expect(deleteDocument).toHaveBeenCalledWith("branches", mockBranchId);
        });

        it("should throw an error if branch not found", async () => {
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue({ empty: true });

            await expect(deleteBranch("nonExistentBranch")).rejects.toThrow("Branch with ID \"nonExistentBranch\" not found.");
        });
    });

    describe("getEmployeesByBranch", () => {
        it("should retrieve employees by branch", async () => {
            const mockEmployeeSnapshot = {
                docs: [{ id: "emp123", data: () => mockEmployeeData }]
            };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockEmployeeSnapshot);

            const result = await getEmployeesByBranch(mockBranchId);

            expect(result).toEqual([mockEmployeeData]);
            expect(getDocumentsByFieldValue).toHaveBeenCalledWith("branches", "branchId", mockBranchId);
        });
    });
});