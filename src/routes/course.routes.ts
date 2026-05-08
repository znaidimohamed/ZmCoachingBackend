import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCoursesAdmin,
  getCourses,
  toggleCourseStatus,
} from "../controllers/course.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getCourses);

router.get("/admin", protect, allowRoles("admin"), getAllCoursesAdmin);

router.post("/", protect, allowRoles("admin"), createCourse);

router.patch(
  "/:id/toggle-status",
  protect,
  allowRoles("admin"),
  toggleCourseStatus
);

router.delete("/:id", protect, allowRoles("admin"), deleteCourse);

export default router;