import { Router } from "express";
import {
  createMyCheckIn,
  deleteCheckIn,
  getCheckInsAdmin,
  getCheckInsByUserAdmin,
  getMyCheckIns,
  addCoachFeedback,
} from "../controllers/checkin.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import { uploadCheckInPhotos } from "../middlewares/checkinUpload.middleware";

const router = Router();

router.post("/me", protect, uploadCheckInPhotos, createMyCheckIn);

router.get("/me", protect, getMyCheckIns);

router.get("/admin", protect, allowRoles("admin"), getCheckInsAdmin);

router.get(
  "/admin/user/:userId",
  protect,
  allowRoles("admin"),
  getCheckInsByUserAdmin
);
router.patch(
  "/:id/feedback",
  protect,
  allowRoles("admin"),
  addCoachFeedback
);

router.delete("/:id", protect, allowRoles("admin"), deleteCheckIn);

export default router;