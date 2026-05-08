import { Router } from "express";
import {
  createTrainingProgram,
  deleteTrainingProgram,
  getAllTrainingProgramsAdmin,
  getMyTrainingPrograms,
  getTrainingPrograms,
  toggleTrainingProgramStatus,
  updateTrainingProgramAssignedUsers,
} from "../controllers/trainingProgram.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import { uploadTrainingPdf } from "../middlewares/trainingPdfUpload.middleware";

const router = Router();

router.get("/", getTrainingPrograms);

router.get("/me", protect, getMyTrainingPrograms);

router.get("/admin", protect, allowRoles("admin"), getAllTrainingProgramsAdmin);

router.post(
  "/",
  protect,
  allowRoles("admin"),
  uploadTrainingPdf,
  createTrainingProgram
);

router.patch(
  "/:id/assigned-users",
  protect,
  allowRoles("admin"),
  updateTrainingProgramAssignedUsers
);

router.patch(
  "/:id/toggle-status",
  protect,
  allowRoles("admin"),
  toggleTrainingProgramStatus
);

router.delete("/:id", protect, allowRoles("admin"), deleteTrainingProgram);

export default router;