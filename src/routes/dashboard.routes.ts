import { Router } from "express";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import {
  adminDashboard,
  userDashboard
} from "../controllers/dashboard.controller";

const router = Router();

router.get("/admin", protect, allowRoles("admin"), adminDashboard);
router.get("/me", protect, userDashboard);

export default router;