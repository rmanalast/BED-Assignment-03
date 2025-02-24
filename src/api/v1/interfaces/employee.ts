export interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    branchId: string;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}