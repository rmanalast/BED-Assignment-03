import { db } from "../../../../config/firebaseConfig";  // Adjust path if needed

// Create a new document in the specified collection
export const createDocument = async (collection: string, data: any) => {
    const docRef = await db.collection(collection).add(data);
    return docRef.id;
};

// Get all documents from the specified collection
export const getDocuments = async (collection: string) => {
    const snapshot = await db.collection(collection).get();
    return snapshot;
};

// Get documents from a collection by a specific field's value
export const getDocumentsByFieldValue = async (collection: string, field: string, value: any) => {
    const snapshot = await db.collection(collection).where(field, "==", value).get();
    return snapshot;
};

// Update a document in the specified collection by ID
export const updateDocument = async (collection: string, id: string, data: any) => {
    await db.collection(collection).doc(id).update(data);
};

// Delete a document from the specified collection by ID
export const deleteDocument = async (collection: string, id: string) => {
    await db.collection(collection).doc(id).delete();
};