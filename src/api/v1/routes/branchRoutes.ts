import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const router: Router = express.Router();

router.post("/branches", branchController.createBranch);
router.get("/branches", branchController.getAllBranches);
router.get("/branches/:id", branchController.getBranchById);
router.put("/branches/:id", branchController.updateBranch);
router.delete("/branches/:id", branchController.deleteBranch);

export default router;