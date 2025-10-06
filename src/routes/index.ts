import { Router } from "express";
import departmentRoutes from "./departmentRoutes";
import citizenRoutes from "./citizenRoutes";

const router = Router();

router.use("/departments", departmentRoutes);
router.use("/citizens", citizenRoutes);

export default router;
