import { Router } from "express";
import {
  getChatClientsAdmin,
  getConversationAdmin,
  getMyConversation,
  sendMessageAdmin,
  sendMyMessage,
} from "../controllers/message.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/admin/clients", protect, allowRoles("admin"), getChatClientsAdmin);

router.get(
  "/admin/:userId",
  protect,
  allowRoles("admin"),
  getConversationAdmin
);

router.post(
  "/admin/:userId",
  protect,
  allowRoles("admin"),
  sendMessageAdmin
);

router.get("/me", protect, allowRoles("user"), getMyConversation);

router.post("/me", protect, allowRoles("user"), sendMyMessage);

export default router;