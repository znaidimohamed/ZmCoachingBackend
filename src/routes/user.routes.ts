import { Router } from "express";
import {
  createUser,
  listUsers,
  myProfile,
  updateUserStatus,
  updateUserProfile // 👈 زيد هذا
} from "../controllers/user.controller";

import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", protect, allowRoles("admin"), createUser);
router.get("/", protect, allowRoles("admin"), listUsers);

router.patch("/:id/toggle-status", protect, allowRoles("admin"), updateUserStatus);

// 👇 NEW ROUTE
router.put(
  "/:id/profile",
  protect,
  allowRoles("admin"),
  updateUserProfile
);

router.get("/me/profile", protect, myProfile);

export default router;