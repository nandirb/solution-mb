import { Router } from "express";
import { calculateAge, getCitizens } from "../controllers/citizenController";

const router = Router();

router.post("/age", calculateAge);
router.get("/", getCitizens);

export default router;
