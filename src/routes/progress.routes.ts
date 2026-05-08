import { Router } from "express";
import {
  createProgressEntry,
  deleteProgressEntry,
  getMyProgress,
  getProgressByUserAdmin,
} from "../controllers/progress.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/me", protect, getMyProgress);

router.get(
  "/user/:userId",
  protect,
  allowRoles("admin"),
  getProgressByUserAdmin
);

router.post("/", protect, allowRoles("admin"), createProgressEntry);

router.delete("/:id", protect, allowRoles("admin"), deleteProgressEntry);

export default router;