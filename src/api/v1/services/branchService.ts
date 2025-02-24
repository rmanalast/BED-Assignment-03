import { Branch } from "../interfaces/branch";
import { Employee } from "../interfaces/employee";
import {
    createDocument,
    getDocuments,
    getDocumentsByFieldValue,
    updateDocument,
    deleteDocument
} from "../utils/firestoreUtils";

const COLLECTION = "branches";

/**
 * @description Create a new branch.
 * @param {Partial<Branch>} branch - The branch data.
 * @returns {Promise<Branch>}
 */
export const createBranch = async (branch: Partial<Branch>): Promise<Branch> => {
    const id = await createDocument(COLLECTION, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Get all branches.
 * @returns {Promise<Branch[]>}
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot = await getDocuments(COLLECTION);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Branch;
    });
};

/**
 * @description Get a branch by ID.
 * @param {string} id - The ID of the branch.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const snapshot = await getDocumentsByFieldValue(COLLECTION, "id", id);
    if (snapshot.empty) {
        throw new Error(`Branch with ID "${id}" not found.`);
    }

    const doc = snapshot.docs[0];
    const data = doc.data();
    return { id: doc.id, ...data } as Branch;
};

/**
 * @description Update an existing branch.
 * @param {string} id - The ID of the branch to update.
 * @param {Partial<Branch>} branch - The updated branch data.
 * @returns {Promise<Branch>}
 * @throws {Error} If the branch with the given ID is not found.
 */
export const updateBranch = async (
    id: string,
    branch: Partial<Branch>
): Promise<Branch> => {
    await updateDocument(COLLECTION, id, branch);
    return { id, ...branch } as Branch;
};

/**
 * @description Delete a branch.
 * @param {string} id - The ID of the branch to delete.
 * @returns {Promise<boolean>} Returns true if the branch is deleted, false otherwise.
 * @throws {Error} If the branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<boolean> => {
    const snapshot = await getDocumentsByFieldValue(COLLECTION, "id", id);

    if (snapshot.empty) {
        throw new Error(`Branch with ID "${id}" not found.`);
    }

    // Assuming the branch exists and you can delete it
    await deleteDocument(COLLECTION, id);
    return true; // Return true if the deletion was successful
};

/**
 * @description Get employees for a specific branch.
 * @param {string} branchId - The branch ID.
 * @returns {Promise<Employee[]>}
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    const snapshot = await getDocumentsByFieldValue(COLLECTION, "branchId", branchId);

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data } as Employee;
    });
};