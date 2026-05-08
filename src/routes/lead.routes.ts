import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLeadsAdmin,
  toggleLeadStatus,
} from "../controllers/lead.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", createLead);
router.get("/admin", protect, allowRoles("admin"), getLeadsAdmin);
router.patch("/:id/toggle-status", protect, allowRoles("admin"), toggleLeadStatus);
router.delete("/:id", protect, allowRoles("admin"), deleteLead);

export default router;