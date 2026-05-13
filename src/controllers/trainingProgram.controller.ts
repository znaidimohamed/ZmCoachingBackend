import { Request, Response } from "express";
import { TrainingProgram } from "../models/trainingProgram.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export const createTrainingProgram = async (req: Request, res: Response) => {
  try {
    const { name, duration, level, description, assignedUsers } = req.body;

    if (!name || !duration || !level || !description) {
      return res.status(400).json({
        message: "name, duration, level and description are required",
      });
    }

    const parsedAssignedUsers =
      typeof assignedUsers === "string"
        ? JSON.parse(assignedUsers || "[]")
        : Array.isArray(assignedUsers)
        ? assignedUsers
        : [];

    let pdfUrl: string | undefined;
    let pdfName: string | undefined;

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer,
        "zmcoaching/training-pdfs",
        "raw"
      );

      pdfUrl = result.secure_url;
      pdfName = req.file.originalname;
    }

    const program = await TrainingProgram.create({
      name,
      duration,
      level,
      description,
      assignedUsers: parsedAssignedUsers,
      pdfUrl,
      pdfName,
    });

    res.status(201).json({
      message: "Training program created successfully",
      program,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrainingPrograms = async (_req: Request, res: Response) => {
  try {
    const programs = await TrainingProgram.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({ programs });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch training programs",
    });
  }
};

export const getMyTrainingPrograms = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const programs = await TrainingProgram.find({
      isActive: true,
      assignedUsers: userId,
    }).sort({ createdAt: -1 });

    res.json({ programs });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch user training programs",
    });
  }
};

export const getAllTrainingProgramsAdmin = async (
  _req: Request,
  res: Response
) => {
  try {
    const programs = await TrainingProgram.find()
      .populate("assignedUsers", "fullName email role")
      .sort({ createdAt: -1 });

    res.json({ programs });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch admin training programs",
    });
  }
};

export const updateTrainingProgramAssignedUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const { assignedUsers } = req.body;

    const program = await TrainingProgram.findByIdAndUpdate(
      req.params.id,
      {
        assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : [],
      },
      { new: true }
    ).populate("assignedUsers", "fullName email role");

    if (!program) {
      return res.status(404).json({
        message: "Training program not found",
      });
    }

    res.json({
      message: "Assigned users updated successfully",
      program,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update assigned users",
    });
  }
};

export const toggleTrainingProgramStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const program = await TrainingProgram.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "Training program not found",
      });
    }

    program.isActive = !program.isActive;
    await program.save();

    res.json({
      message: "Training program status updated",
      program,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update training program status",
    });
  }
};

export const deleteTrainingProgram = async (req: Request, res: Response) => {
  try {
    await TrainingProgram.findByIdAndDelete(req.params.id);

    res.json({
      message: "Training program deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete training program",
    });
  }
};