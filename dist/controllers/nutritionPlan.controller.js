"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleNutritionPlanStatus = exports.deleteNutritionPlan = exports.updateNutritionPlanAssignedUsers = exports.getMyNutritionPlans = exports.getAllNutritionPlansAdmin = exports.getNutritionPlans = exports.uploadPlanPdf = exports.createNutritionPlan = void 0;
const nutritionPlan_model_1 = require("../models/nutritionPlan.model");
const createNutritionPlan = async (req, res) => {
    try {
        const { title, subtitle, description, calories, goal, meals, isPopular, assignedUsers, } = req.body;
        const plan = await nutritionPlan_model_1.NutritionPlan.create({
            title,
            subtitle,
            description,
            calories,
            goal,
            meals: Array.isArray(meals)
                ? meals
                : String(meals)
                    .split("\n")
                    .map((m) => m.trim())
                    .filter(Boolean),
            assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : [],
            isPopular: isPopular === true || isPopular === "true",
        });
        res.status(201).json({
            message: "Nutrition plan created successfully",
            plan,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createNutritionPlan = createNutritionPlan;
const uploadPlanPdf = async (req, res) => {
    try {
        const plan = await nutritionPlan_model_1.NutritionPlan.findById(req.params.id);
        if (!plan) {
            return res.status(404).json({ message: "Nutrition plan not found" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "PDF file is required" });
        }
        plan.pdfUrl = `/uploads/nutrition-pdfs/${req.file.filename}`;
        plan.pdfName = req.file.originalname;
        await plan.save();
        res.json({
            message: "PDF uploaded successfully",
            plan,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.uploadPlanPdf = uploadPlanPdf;
/**
 * Public homepage nutrition plans.
 * These are the marketing/display plans.
 */
const getNutritionPlans = async (_req, res) => {
    const plans = await nutritionPlan_model_1.NutritionPlan.find({ isActive: true }).sort({
        createdAt: -1,
    });
    res.json({ plans });
};
exports.getNutritionPlans = getNutritionPlans;
/**
 * Admin sees all nutrition plans with assigned users populated.
 */
const getAllNutritionPlansAdmin = async (_req, res) => {
    const plans = await nutritionPlan_model_1.NutritionPlan.find()
        .populate("assignedUsers", "fullName email role")
        .sort({ createdAt: -1 });
    res.json({ plans });
};
exports.getAllNutritionPlansAdmin = getAllNutritionPlansAdmin;
/**
 * Connected user sees only nutrition plans assigned to him.
 */
const getMyNutritionPlans = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const plans = await nutritionPlan_model_1.NutritionPlan.find({
            isActive: true,
            assignedUsers: userId,
        }).sort({ createdAt: -1 });
        res.json({ plans });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch user nutrition plans",
        });
    }
};
exports.getMyNutritionPlans = getMyNutritionPlans;
const updateNutritionPlanAssignedUsers = async (req, res) => {
    try {
        const { assignedUsers } = req.body;
        const plan = await nutritionPlan_model_1.NutritionPlan.findByIdAndUpdate(req.params.id, {
            assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : [],
        }, { new: true }).populate("assignedUsers", "fullName email role");
        if (!plan) {
            return res.status(404).json({ message: "Nutrition plan not found" });
        }
        res.json({
            message: "Assigned users updated successfully",
            plan,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update assigned users",
        });
    }
};
exports.updateNutritionPlanAssignedUsers = updateNutritionPlanAssignedUsers;
const deleteNutritionPlan = async (req, res) => {
    await nutritionPlan_model_1.NutritionPlan.findByIdAndDelete(req.params.id);
    res.json({ message: "Nutrition plan deleted successfully" });
};
exports.deleteNutritionPlan = deleteNutritionPlan;
const toggleNutritionPlanStatus = async (req, res) => {
    const plan = await nutritionPlan_model_1.NutritionPlan.findById(req.params.id);
    if (!plan) {
        return res.status(404).json({ message: "Nutrition plan not found" });
    }
    plan.isActive = !plan.isActive;
    await plan.save();
    res.json({
        message: "Nutrition plan status updated",
        plan,
    });
};
exports.toggleNutritionPlanStatus = toggleNutritionPlanStatus;
