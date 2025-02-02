import express, { Router } from "express";
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/itemController";

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/items:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: List of items
 */
router.get("/items", getAllItems);

/**
 * @swagger
 * /api/v1/items:
 *   post:
 *     description: Create a new item
 *     responses:
 *       201:
 *         description: Item created successfully
 */
router.post("/items", createItem);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   put:
 *     description: Update an existing item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to update
 *     responses:
 *       200:
 *         description: Item updated successfully
 */
router.put("/items/:id", updateItem);

/**
 * @swagger
 * /api/v1/items/{id}:
 *   delete:
 *     description: Delete an existing item by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the item to delete
 *     responses:
 *       200:
 *         description: Item deleted successfully
 */
router.delete("/items/:id", deleteItem);

export default router;
