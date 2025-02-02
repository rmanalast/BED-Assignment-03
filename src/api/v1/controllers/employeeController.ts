import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../interfaces/employee";

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees" });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.getEmployeeById(req.params.id);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch employee" });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const newEmployee: Employee = req.body;
        const createdEmployee = await employeeService.createEmployee(newEmployee);
        res.status(201).json(createdEmployee);
    } catch (error) {
        res.status(500).json({ error: "Failed to create employee" });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const updatedEmployee = await employeeService.updateEmployee(req.params.id, req.body);
        if (!updatedEmployee) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: "Failed to update employee" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deleted = await employeeService.deleteEmployee(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete employee" });
    }
};
