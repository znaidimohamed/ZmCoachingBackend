"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrainingProgram = exports.toggleTrainingProgramStatus = exports.updateTrainingProgramAssignedUsers = exports.getAllTrainingProgramsAdmin = exports.getMyTrainingPrograms = exports.getTrainingPrograms = exports.createTrainingProgram = void 0;
const trainingProgram_model_1 = require("../models/trainingProgram.model");
const createTrainingProgram = async (req, res) => {
    try {
        const { name, duration, level, description, assignedUsers } = req.body;
        if (!name || !duration || !level || !description) {
            return res.status(400).json({
                message: "name, duration, level and description are required",
            });
        }
        const parsedAssignedUsers = typeof assignedUsers === "string"
            ? JSON.parse(assignedUsers || "[]")
            : Array.isArray(assignedUsers)
                ? assignedUsers
                : [];
        const program = await trainingProgram_model_1.TrainingProgram.create({
            name,
            duration,
            level,
            description,
            assignedUsers: parsedAssignedUsers,
            pdfUrl: req.file
                ? `/uploads/training-pdfs/${req.file.filename}`
                : undefined,
            pdfName: req.file ? req.file.originalname : undefined,
        });
        res.status(201).json({
            message: "Training program created successfully",
            program,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTrainingProgram = createTrainingProgram;
const getTrainingPrograms = async (_req, res) => {
    const programs = await trainingProgram_model_1.TrainingProgram.find({ isActive: true }).sort({
        createdAt: -1,
    });
    res.json({ programs });
};
exports.getTrainingPrograms = getTrainingPrograms;
const getMyTrainingPrograms = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const programs = await trainingProgram_model_1.TrainingProgram.find({
            isActive: true,
            assignedUsers: userId,
        }).sort({ createdAt: -1 });
        res.json({ programs });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch user training programs",
        });
    }
};
exports.getMyTrainingPrograms = getMyTrainingPrograms;
const getAllTrainingProgramsAdmin = async (_req, res) => {
    const programs = await trainingProgram_model_1.TrainingProgram.find()
        .populate("assignedUsers", "fullName email role")
        .sort({ createdAt: -1 });
    res.json({ programs });
};
exports.getAllTrainingProgramsAdmin = getAllTrainingProgramsAdmin;
const updateTrainingProgramAssignedUsers = async (req, res) => {
    try {
        const { assignedUsers } = req.body;
        const program = await trainingProgram_model_1.TrainingProgram.findByIdAndUpdate(req.params.id, {
            assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : [],
        }, { new: true }).populate("assignedUsers", "fullName email role");
        if (!program) {
            return res.status(404).json({ message: "Training program not found" });
        }
        res.json({
            message: "Assigned users updated successfully",
            program,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update assigned users",
        });
    }
};
exports.updateTrainingProgramAssignedUsers = updateTrainingProgramAssignedUsers;
const toggleTrainingProgramStatus = async (req, res) => {
    const program = await trainingProgram_model_1.TrainingProgram.findById(req.params.id);
    if (!program) {
        return res.status(404).json({ message: "Training program not found" });
    }
    program.isActive = !program.isActive;
    await program.save();
    res.json({
        message: "Training program status updated",
        program,
    });
};
exports.toggleTrainingProgramStatus = toggleTrainingProgramStatus;
const deleteTrainingProgram = async (req, res) => {
    await trainingProgram_model_1.TrainingProgram.findByIdAndDelete(req.params.id);
    res.json({ message: "Training program deleted successfully" });
};
exports.deleteTrainingProgram = deleteTrainingProgram;
