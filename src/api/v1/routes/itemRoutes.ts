import express, { Router } from "express";
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem,
} from "../controllers/itemController";

const router: Router = express.Router();

router.get("/items", getAllItems);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;