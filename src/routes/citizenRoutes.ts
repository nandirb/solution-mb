import { Router } from "express";
import {
  calculateAge,
  getCitizens,
  updateAllAges,
} from "../controllers/citizenController";

const router = Router();

router.post("/age", calculateAge);
router.post("/update-ages", updateAllAges);
router.get("/", getCitizens);

export default router;
