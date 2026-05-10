"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboardStats = void 0;
const user_model_1 = require("../models/user.model");
const lead_model_1 = require("../models/lead.model");
const purchaseRequest_model_1 = require("../models/purchaseRequest.model");
const progress_model_1 = require("../models/progress.model");
const schedule_model_1 = require("../models/schedule.model");
const course_model_1 = require("../models/course.model");
const pack_model_1 = require("../models/pack.model");
const nutritionPlan_model_1 = require("../models/nutritionPlan.model");
const trainingProgram_model_1 = require("../models/trainingProgram.model");
const getAdminDashboardStats = async () => {
    const [totalUsers, activeUsers, totalLeads, newLeads, totalPurchases, pendingPurchases, paidPurchases, activeSchedules, totalCourses, totalPacks, totalNutritionPlans, totalTrainingPrograms, latestLeads, latestPurchases, latestProgress,] = await Promise.all([
        user_model_1.User.countDocuments({ role: "user" }),
        user_model_1.User.countDocuments({ role: "user", isActive: true }),
        lead_model_1.Lead.countDocuments(),
        lead_model_1.Lead.countDocuments({ status: "new" }),
        purchaseRequest_model_1.PurchaseRequest.countDocuments(),
        purchaseRequest_model_1.PurchaseRequest.countDocuments({ status: "pending" }),
        purchaseRequest_model_1.PurchaseRequest.countDocuments({ status: "paid" }),
        schedule_model_1.Schedule.countDocuments({ isActive: true }),
        course_model_1.Course.countDocuments({ isActive: true }),
        pack_model_1.Pack.countDocuments({ isActive: true }),
        nutritionPlan_model_1.NutritionPlan.countDocuments({ isActive: true }),
        trainingProgram_model_1.TrainingProgram.countDocuments({ isActive: true }),
        lead_model_1.Lead.find().sort({ createdAt: -1 }).limit(5),
        purchaseRequest_model_1.PurchaseRequest.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 })
            .limit(5),
        progress_model_1.ProgressEntry.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 })
            .limit(5),
    ]);
    return {
        totals: {
            totalUsers,
            activeUsers,
            totalLeads,
            newLeads,
            totalPurchases,
            pendingPurchases,
            paidPurchases,
            activeSchedules,
            totalCourses,
            totalPacks,
            totalNutritionPlans,
            totalTrainingPrograms,
        },
        latest: {
            leads: latestLeads,
            purchases: latestPurchases,
            progress: latestProgress,
        },
    };
};
exports.getAdminDashboardStats = getAdminDashboardStats;
