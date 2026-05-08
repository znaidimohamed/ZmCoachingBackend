import { Router } from "express";
import {
  createNutritionPlan,
  deleteNutritionPlan,
  getAllNutritionPlansAdmin,
  getMyNutritionPlans,
  getNutritionPlans,
  toggleNutritionPlanStatus,
  updateNutritionPlanAssignedUsers,
  uploadPlanPdf,
} from "../controllers/nutritionPlan.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import { uploadNutritionPdf } from "../middlewares/nutritionPdfUpload.middleware";

const router = Router();

router.get("/", getNutritionPlans);

router.get("/me", protect, getMyNutritionPlans);

router.get("/admin", protect, allowRoles("admin"), getAllNutritionPlansAdmin);

router.post("/", protect, allowRoles("admin"), createNutritionPlan);

router.patch(
  "/:id/pdf",
  protect,
  allowRoles("admin"),
  uploadNutritionPdf,
  uploadPlanPdf
);

router.patch(
  "/:id/assigned-users",
  protect,
  allowRoles("admin"),
  updateNutritionPlanAssignedUsers
);

router.patch(
  "/:id/toggle-status",
  protect,
  allowRoles("admin"),
  toggleNutritionPlanStatus
);

router.delete("/:id", protect, allowRoles("admin"), deleteNutritionPlan);

export default router;