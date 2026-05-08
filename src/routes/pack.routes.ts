import { Router } from "express";
import {
  createPack,
  deletePack,
  getAllPacksAdmin,
  getPacks,
  togglePackStatus,
} from "../controllers/pack.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getPacks);
router.get("/admin", protect, allowRoles("admin"), getAllPacksAdmin);
router.post("/", protect, allowRoles("admin"), createPack);
router.patch("/:id/toggle-status", protect, allowRoles("admin"), togglePackStatus);
router.delete("/:id", protect, allowRoles("admin"), deletePack);

export default router;