import { Branch } from "../interfaces/branch";
import { Employee } from "../interfaces/employee";

// In-memory branch storage
let branches: Branch[] = [];

// Mock data for employees
const employees: Employee[] = [
    {
        id: "1", 
        name: "Alice Johnson", 
        position: "Branch Manager", 
        branchId: "1", 
        departmentId: "1",
        department: "Management",
        email: "alice.johnson@pixell-river.com",
        phone: "604-555-0148"
    },
    {
        id: "2", 
        name: "Amandeep Singh", 
        position: "Customer Service Representative", 
        branchId: "2", 
        departmentId: "2",
        department: "Customer Service",
        email: "amandeep.singh@pixell-river.com",
        phone: "780-555-0172"
    },
    {
        id: "3", 
        name: "Maria Garcia", 
        position: "Loan Officer", 
        branchId: "3", 
        departmentId: "3",
        department: "Loans",
        email: "maria.garcia@pixell-river.com",
        phone: "204-555-0193"
    },
];

// Create Branch
export const createBranch = (newBranch: Branch): Branch => {
    newBranch.id = (branches.length + 1).toString(); // Simple ID generation
    branches.push(newBranch);
    return newBranch;
};

// Get All Branches
export const getAllBranches = (): Branch[] => {
    return branches;
};

// Get Branch by ID
export const getBranchById = (id: string): Branch | undefined => {
    return branches.find(branch => branch.id === id);
};

// Update Branch
export const updateBranch = (id: string, updatedBranch: Branch): Branch | null => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches[index] = { ...branches[index], ...updatedBranch };
        return branches[index];
    }
    return null;
};

// Delete Branch
export const deleteBranch = (id: string): boolean => {
    const index = branches.findIndex(branch => branch.id === id);
    if (index !== -1) {
        branches.splice(index, 1);
        return true;
    }
    return false;
};

// Get Employees by Branch ID
export const getEmployeesByBranch = (branchId: string): Employee[] => {
    return employees.filter(employee => employee.branchId === branchId);
};

// Get Employees by Department
export const getEmployeesByDepartment = (departmentId: string): Employee[] => {
    return employees.filter(employee => employee.departmentId === departmentId);
};