"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCheckIn = exports.addCoachFeedback = exports.getCheckInsByUserAdmin = exports.getCheckInsAdmin = exports.getMyCheckIns = exports.createMyCheckIn = void 0;
const checkin_model_1 = require("../models/checkin.model");
const createMyCheckIn = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { date, weight, sleep, energy, mood, notes } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!weight) {
            return res.status(400).json({
                message: "weight is required",
            });
        }
        const files = req.files;
        const checkIn = await checkin_model_1.CheckIn.create({
            user: userId,
            date: date || new Date(),
            weight: Number(weight),
            sleep: sleep ? Number(sleep) : undefined,
            energy: energy ? Number(energy) : undefined,
            mood,
            notes,
            frontPhoto: files?.frontPhoto?.[0]
                ? `/uploads/checkins/${files.frontPhoto[0].filename}`
                : undefined,
            sidePhoto: files?.sidePhoto?.[0]
                ? `/uploads/checkins/${files.sidePhoto[0].filename}`
                : undefined,
            backPhoto: files?.backPhoto?.[0]
                ? `/uploads/checkins/${files.backPhoto[0].filename}`
                : undefined,
        });
        res.status(201).json({
            message: "Check-in sent successfully",
            checkIn,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create check-in",
        });
    }
};
exports.createMyCheckIn = createMyCheckIn;
const getMyCheckIns = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const checkIns = await checkin_model_1.CheckIn.find({
            user: userId,
        }).sort({ date: -1 });
        res.json({ checkIns });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch check-ins",
        });
    }
};
exports.getMyCheckIns = getMyCheckIns;
const getCheckInsAdmin = async (_req, res) => {
    try {
        const checkIns = await checkin_model_1.CheckIn.find()
            .populate("user", "fullName email phone")
            .sort({ createdAt: -1 });
        res.json({ checkIns });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch check-ins",
        });
    }
};
exports.getCheckInsAdmin = getCheckInsAdmin;
const getCheckInsByUserAdmin = async (req, res) => {
    try {
        const checkIns = await checkin_model_1.CheckIn.find({
            user: req.params.userId,
        })
            .populate("user", "fullName email phone")
            .sort({ date: -1 });
        res.json({ checkIns });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch user check-ins",
        });
    }
};
exports.getCheckInsByUserAdmin = getCheckInsByUserAdmin;
const addCoachFeedback = async (req, res) => {
    try {
        const { feedback } = req.body;
        if (!feedback) {
            return res.status(400).json({
                message: "feedback is required",
            });
        }
        const checkIn = await checkin_model_1.CheckIn.findByIdAndUpdate(req.params.id, {
            coachFeedback: feedback,
            feedbackDate: new Date(),
        }, { new: true }).populate("user", "fullName email phone");
        if (!checkIn) {
            return res.status(404).json({
                message: "Check-in not found",
            });
        }
        res.json({
            message: "Feedback added successfully",
            checkIn,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to add feedback",
        });
    }
};
exports.addCoachFeedback = addCoachFeedback;
const deleteCheckIn = async (req, res) => {
    try {
        await checkin_model_1.CheckIn.findByIdAndDelete(req.params.id);
        res.json({
            message: "Check-in deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete check-in",
        });
    }
};
exports.deleteCheckIn = deleteCheckIn;
