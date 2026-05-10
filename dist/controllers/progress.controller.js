"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProgressEntry = exports.getMyProgress = exports.getProgressByUserAdmin = exports.createProgressEntry = void 0;
const progress_model_1 = require("../models/progress.model");
const createProgressEntry = async (req, res) => {
    try {
        const { user, date, weight, waist, chest, arms, notes } = req.body;
        if (!user || !weight) {
            return res.status(400).json({
                message: "user and weight are required",
            });
        }
        const entry = await progress_model_1.ProgressEntry.create({
            user,
            date: date || new Date(),
            weight,
            waist,
            chest,
            arms,
            notes,
        });
        res.status(201).json({
            message: "Progress entry created successfully",
            entry,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create progress entry",
        });
    }
};
exports.createProgressEntry = createProgressEntry;
const getProgressByUserAdmin = async (req, res) => {
    try {
        const entries = await progress_model_1.ProgressEntry.find({
            user: req.params.userId,
        })
            .populate("user", "fullName email")
            .sort({ date: 1 });
        res.json({
            entries,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch progress",
        });
    }
};
exports.getProgressByUserAdmin = getProgressByUserAdmin;
const getMyProgress = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const entries = await progress_model_1.ProgressEntry.find({
            user: userId,
        }).sort({ date: 1 });
        res.json({
            entries,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch my progress",
        });
    }
};
exports.getMyProgress = getMyProgress;
const deleteProgressEntry = async (req, res) => {
    try {
        await progress_model_1.ProgressEntry.findByIdAndDelete(req.params.id);
        res.json({
            message: "Progress entry deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete progress entry",
        });
    }
};
exports.deleteProgressEntry = deleteProgressEntry;
