import { Router } from "express";
import {
  createPurchaseRequest,
  deletePurchaseRequest,
  getMyPurchaseRequests,
  getPurchaseRequestsAdmin,
  updatePurchaseStatus,
} from "../controllers/purchaseRequest.controller";
import { protect } from "../middlewares/auth.middleware";
import { allowRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", protect, createPurchaseRequest);

router.get("/me", protect, getMyPurchaseRequests);

router.get(
  "/admin",
  protect,
  allowRoles("admin"),
  getPurchaseRequestsAdmin
);

router.patch(
  "/:id/status",
  protect,
  allowRoles("admin"),
  updatePurchaseStatus
);

router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deletePurchaseRequest
);

export default router;