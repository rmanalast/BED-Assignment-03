import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeesByDepartment
} from '../src/api/v1/services/employeeService';
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

describe("Employee Service", () => {
    const mockEmployeeData = {
        name: "John Doe",
        position: "Manager",
        department: "HR",
        email: "johndoe@company.com",
        phone: "123-456-7890",
        branchId: "branch123"
    };
    const mockEmployeeId = "emp123";
    const mockEmployee = { id: mockEmployeeId, ...mockEmployeeData };
    const mockDepartment = "HR";

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock Firestore responses
        (getDocumentsByFieldValue as jest.Mock).mockResolvedValue({
            docs: [{ id: mockEmployeeId, data: () => mockEmployeeData }]
        });
    });

    describe("createEmployee", () => {
        it("should create an employee successfully", async () => {
            (createDocument as jest.Mock).mockResolvedValue(mockEmployeeId);

            const result = await createEmployee(mockEmployeeData);

            expect(result).toEqual({ ...mockEmployeeData, id: mockEmployeeId });
            expect(createDocument).toHaveBeenCalledWith("employees", mockEmployeeData);
        });
    });

    describe("getAllEmployees", () => {
        it("should retrieve all employees", async () => {
            const mockSnapshot = {
                docs: [
                    { id: "emp1", data: () => mockEmployeeData },
                    { id: "emp2", data: () => mockEmployeeData }
                ]
            };
            (getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

            const result = await getAllEmployees();

            expect(result).toEqual([
                { id: "emp1", ...mockEmployeeData },
                { id: "emp2", ...mockEmployeeData }
            ]);
            expect(getDocuments).toHaveBeenCalledWith("employees");
        });
    });

    describe("getEmployeeById", () => {
        it("should retrieve an employee by ID", async () => {
            const mockSnapshot = {
                docs: [{ id: mockEmployeeId, data: () => mockEmployeeData }]
            };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            const result = await getEmployeeById(mockEmployeeId);

            expect(result).toEqual(mockEmployee);
            expect(getDocumentsByFieldValue).toHaveBeenCalledWith("employees", "id", mockEmployeeId);
        });

        it("should throw an error if employee not found", async () => {
            const mockSnapshot = { empty: true };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            await expect(getEmployeeById("nonExistentEmployee"))
                .rejects
                .toThrow("Employee with ID \"nonExistentEmployee\" not found.");
        });
    });

    describe("updateEmployee", () => {
        it("should update an employee successfully", async () => {
            const updatedEmployee = { ...mockEmployeeData, phone: "987-654-3210" };
            const updatedEmployeeWithId = { id: mockEmployeeId, ...updatedEmployee };
    
            (updateDocument as jest.Mock).mockResolvedValue(null);
    
            const result = await updateEmployee(mockEmployeeId, updatedEmployee);
    
            // Ensure the result includes the `id` field and matches the updated employee data
            expect(result).toEqual(updatedEmployeeWithId);
            expect(updateDocument).toHaveBeenCalledWith("employees", mockEmployeeId, updatedEmployee);
        });
    });

    describe("deleteEmployee", () => {
        it("should delete an employee successfully", async () => {
            (deleteDocument as jest.Mock).mockResolvedValue(null);

            const result = await deleteEmployee(mockEmployeeId);

            expect(result).toBe(true);
            expect(deleteDocument).toHaveBeenCalledWith("employees", mockEmployeeId);
        });

        it("should throw an error if employee not found", async () => {
            (deleteDocument as jest.Mock).mockRejectedValue(new Error("Employee with ID \"nonExistentEmployee\" not found."));

            await expect(deleteEmployee("nonExistentEmployee"))
                .rejects
                .toThrow("Employee with ID \"nonExistentEmployee\" not found.");
        });
    });

    describe("getEmployeesByDepartment", () => {
        it("should retrieve employees by department", async () => {
            const mockSnapshot = {
                docs: [{ id: "emp123", data: () => ({ ...mockEmployeeData, id: "emp123" }) }]
            };
            (getDocumentsByFieldValue as jest.Mock).mockResolvedValue(mockSnapshot);

            const result = await getEmployeesByDepartment(mockDepartment);

            expect(result).toEqual([mockEmployee]);
            expect(getDocumentsByFieldValue).toHaveBeenCalledWith("employees", "department", mockDepartment);
        });
    });
});