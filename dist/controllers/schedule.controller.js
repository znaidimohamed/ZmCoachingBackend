"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSchedule = exports.toggleScheduleStatus = exports.getMySchedules = exports.getSchedulesByUserAdmin = exports.getSchedulesAdmin = exports.createSchedule = void 0;
const schedule_model_1 = require("../models/schedule.model");
const createSchedule = async (req, res) => {
    try {
        const { user, day, startTime, endTime, title, type, notes } = req.body;
        if (!user || !day || !startTime || !endTime || !title) {
            return res.status(400).json({
                message: "user, day, startTime, endTime and title are required",
            });
        }
        const schedule = await schedule_model_1.Schedule.create({
            user,
            day,
            startTime,
            endTime,
            title,
            type,
            notes,
        });
        res.status(201).json({
            message: "Schedule created successfully",
            schedule,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create schedule",
        });
    }
};
exports.createSchedule = createSchedule;
const getSchedulesAdmin = async (_req, res) => {
    try {
        const schedules = await schedule_model_1.Schedule.find()
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });
        res.json({ schedules });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch schedules",
        });
    }
};
exports.getSchedulesAdmin = getSchedulesAdmin;
const getSchedulesByUserAdmin = async (req, res) => {
    try {
        const schedules = await schedule_model_1.Schedule.find({
            user: req.params.userId,
        })
            .populate("user", "fullName email")
            .sort({ createdAt: -1 });
        res.json({ schedules });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch user schedules",
        });
    }
};
exports.getSchedulesByUserAdmin = getSchedulesByUserAdmin;
const getMySchedules = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const schedules = await schedule_model_1.Schedule.find({
            user: userId,
            isActive: true,
        }).sort({ createdAt: -1 });
        res.json({ schedules });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch my schedules",
        });
    }
};
exports.getMySchedules = getMySchedules;
const toggleScheduleStatus = async (req, res) => {
    try {
        const schedule = await schedule_model_1.Schedule.findById(req.params.id);
        if (!schedule) {
            return res.status(404).json({ message: "Schedule not found" });
        }
        schedule.isActive = !schedule.isActive;
        await schedule.save();
        res.json({
            message: "Schedule status updated",
            schedule,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update schedule",
        });
    }
};
exports.toggleScheduleStatus = toggleScheduleStatus;
const deleteSchedule = async (req, res) => {
    try {
        await schedule_model_1.Schedule.findByIdAndDelete(req.params.id);
        res.json({
            message: "Schedule deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete schedule",
        });
    }
};
exports.deleteSchedule = deleteSchedule;
