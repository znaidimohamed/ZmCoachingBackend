import { Router } from "express";
import {
  deleteMyNotifications,
  getMyNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../controllers/notification.controller";
import { protect } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", protect, getMyNotifications);

router.patch("/read-all", protect, markAllNotificationsAsRead);

router.patch("/:id/read", protect, markNotificationAsRead);

router.delete("/me", protect, deleteMyNotifications);

export default router;