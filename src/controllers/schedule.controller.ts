import { Request, Response } from "express";
import { Schedule } from "../models/schedule.model";
import { createNotification } from "../utils/createNotification";

export const createSchedule = async (req: Request, res: Response) => {
  try {
    const { user, day, startTime, endTime, title, type, notes } = req.body;
    const coachId = req.user?.userId;

    if (!user || !day || !startTime || !endTime || !title) {
      return res.status(400).json({
        message: "user, day, startTime, endTime and title are required",
      });
    }

    const schedule = await Schedule.create({
      user,
      day,
      startTime,
      endTime,
      title,
      type,
      notes,
    });

    await createNotification({
      recipient: user,
      sender: coachId,
      title: "Nouvelle séance planifiée",
      message: `Votre coach a ajouté une séance: ${title} - ${day} ${startTime}.`,
      type: "schedule",
      link: "/user/schedule",
    });

    res.status(201).json({
      message: "Schedule created successfully",
      schedule,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create schedule",
    });
  }
};

export const getSchedulesAdmin = async (_req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json({ schedules });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch schedules",
    });
  }
};

export const getSchedulesByUserAdmin = async (req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find({
      user: req.params.userId,
    })
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json({ schedules });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch user schedules",
    });
  }
};

export const getMySchedules = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const schedules = await Schedule.find({
      user: userId,
      isActive: true,
    }).sort({ createdAt: -1 });

    res.json({ schedules });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch my schedules",
    });
  }
};

export const toggleScheduleStatus = async (req: Request, res: Response) => {
  try {
    const coachId = req.user?.userId;
    const schedule = await Schedule.findById(req.params.id);

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    schedule.isActive = !schedule.isActive;
    await schedule.save();

    await createNotification({
      recipient: schedule.user,
      sender: coachId,
      title: "Planning mis à jour",
      message: `Votre séance "${schedule.title}" a été ${
        schedule.isActive ? "activée" : "désactivée"
      }.`,
      type: "schedule",
      link: "/user/schedule",
    });

    res.json({
      message: "Schedule status updated",
      schedule,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update schedule",
    });
  }
};

export const deleteSchedule = async (req: Request, res: Response) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);

    res.json({
      message: "Schedule deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete schedule",
    });
  }
};