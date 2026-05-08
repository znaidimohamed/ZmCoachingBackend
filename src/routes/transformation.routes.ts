import { Router } from "express";
import {
  createTransformation,
  deleteTransformation,
  getAllTransformationsAdmin,
  getTransformations,
} from "../controllers/transformation.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";
import { uploadTransformationImages } from "../middlewares/upload.middleware";

const router = Router();

router.get("/", getTransformations);

router.get("/admin", protect, allowRoles("admin"), getAllTransformationsAdmin);

router.post(
  "/",
  protect,
  allowRoles("admin"),
  uploadTransformationImages,
  createTransformation
);

router.delete("/:id", protect, allowRoles("admin"), deleteTransformation);

export default router;