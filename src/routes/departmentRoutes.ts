import { Router } from "express";
import {
  getTopParent,
  getAllParents,
  getAllDepartments,
  getDepartmentById,
} from "../controllers/departmentController";

const router = Router();

router.get("/:id/parent", getTopParent);
router.get("/:id/parents", getAllParents);
router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);

export default router;
