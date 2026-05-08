import { Router } from "express";
import {
  createSchedule,
  deleteSchedule,
  getMySchedules,
  getSchedulesAdmin,
  getSchedulesByUserAdmin,
  toggleScheduleStatus,
} from "../controllers/schedule.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/me", protect, getMySchedules);

router.get("/admin", protect, allowRoles("admin"), getSchedulesAdmin);

router.get(
  "/admin/user/:userId",
  protect,
  allowRoles("admin"),
  getSchedulesByUserAdmin
);

router.post("/", protect, allowRoles("admin"), createSchedule);

router.patch(
  "/:id/toggle-status",
  protect,
  allowRoles("admin"),
  toggleScheduleStatus
);

router.delete("/:id", protect, allowRoles("admin"), deleteSchedule);

export default router;