import { Request, Response } from "express";
import { ProgressEntry } from "../models/progress.model";
import { createNotification } from "../utils/createNotification";

export const createProgressEntry = async (req: Request, res: Response) => {
  try {
    const { user, date, weight, waist, chest, arms, notes } = req.body;
    const coachId = req.user?.userId;

    if (!user || !weight) {
      return res.status(400).json({
        message: "user and weight are required",
      });
    }

    const entry = await ProgressEntry.create({
      user,
      date: date || new Date(),
      weight,
      waist,
      chest,
      arms,
      notes,
    });

    await createNotification({
      recipient: user,
      sender: coachId,
      title: "Nouvelle progression ajoutée",
      message: "Votre coach a ajouté une nouvelle entrée de progression.",
      type: "progress",
      link: "/user/progress",
    });

    res.status(201).json({
      message: "Progress entry created successfully",
      entry,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create progress entry",
    });
  }
};

export const getProgressByUserAdmin = async (req: Request, res: Response) => {
  try {
    const entries = await ProgressEntry.find({
      user: req.params.userId,
    })
      .populate("user", "fullName email")
      .sort({ date: 1 });

    res.json({
      entries,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch progress",
    });
  }
};

export const getMyProgress = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const entries = await ProgressEntry.find({
      user: userId,
    }).sort({ date: 1 });

    res.json({
      entries,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch my progress",
    });
  }
};

export const deleteProgressEntry = async (req: Request, res: Response) => {
  try {
    await ProgressEntry.findByIdAndDelete(req.params.id);

    res.json({
      message: "Progress entry deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete progress entry",
    });
  }
};