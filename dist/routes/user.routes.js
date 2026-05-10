"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.protect, (0, role_middleware_1.allowRoles)("admin"), user_controller_1.createUser);
router.get("/", auth_middleware_1.protect, (0, role_middleware_1.allowRoles)("admin"), user_controller_1.listUsers);
router.patch("/:id/toggle-status", auth_middleware_1.protect, (0, role_middleware_1.allowRoles)("admin"), user_controller_1.updateUserStatus);
// 👇 NEW ROUTE
router.put("/:id/profile", auth_middleware_1.protect, (0, role_middleware_1.allowRoles)("admin"), user_controller_1.updateUserProfile);
router.get("/me/profile", auth_middleware_1.protect, user_controller_1.myProfile);
exports.default = router;
