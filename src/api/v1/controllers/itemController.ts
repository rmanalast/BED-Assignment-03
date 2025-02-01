import { Request, Response } from "express";
import {
    fetchAllItems,
    addItem,
    modifyItem,
    removeItem,
} from "../services/itemService";

export const getAllItems = (req: Request, res: Response): void => {
    const items: string[] = fetchAllItems();
    res.status(200).json({ message: "Get all items", data: items });
};

export const createItem = (req: Request, res: Response): void => {
    const newItem: string = req.body;
    addItem(newItem);
    res.status(201).json({ message: "Item created", data: newItem });
};

export const updateItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    const updatedItem: string = req.body;
    modifyItem(1, updatedItem);
    res.status(200).json({ message: "Item updated", data: updatedItem });
};

export const deleteItem = (req: Request, res: Response): void => {
    const { id } = req.params;
    removeItem(2);
    res.status(200).json({ message: "Item deleted" });
};