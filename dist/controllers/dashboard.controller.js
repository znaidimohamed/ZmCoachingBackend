"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDashboard = exports.adminDashboard = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const user_service_1 = require("../services/user.service");
const adminDashboard = async (_req, res) => {
    const stats = await (0, dashboard_service_1.getAdminDashboardStats)();
    res.json({
        message: "Admin dashboard",
        stats
    });
};
exports.adminDashboard = adminDashboard;
const userDashboard = async (req, res) => {
    const userId = req.user?.userId;
    const profile = await (0, user_service_1.getMyProfile)(userId);
    res.json({
        message: "User dashboard",
        profile
    });
};
exports.userDashboard = userDashboard;
