import { Request, Response } from "express";
import { CheckIn } from "../models/checkin.model";
import { User } from "../models/user.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import { createNotification } from "../utils/createNotification";

export const createMyCheckIn = async (req: Request, res: Response) => {
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

    const files = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let frontPhoto: string | undefined;
    let sidePhoto: string | undefined;
    let backPhoto: string | undefined;

    if (files?.frontPhoto?.[0]) {
      const result = await uploadToCloudinary(
        files.frontPhoto[0].buffer,
        "zmcoaching/checkins",
        "image"
      );

      frontPhoto = result.secure_url;
    }

    if (files?.sidePhoto?.[0]) {
      const result = await uploadToCloudinary(
        files.sidePhoto[0].buffer,
        "zmcoaching/checkins",
        "image"
      );

      sidePhoto = result.secure_url;
    }

    if (files?.backPhoto?.[0]) {
      const result = await uploadToCloudinary(
        files.backPhoto[0].buffer,
        "zmcoaching/checkins",
        "image"
      );

      backPhoto = result.secure_url;
    }

    const checkIn = await CheckIn.create({
      user: userId,
      date: date || new Date(),
      weight: Number(weight),
      sleep: sleep ? Number(sleep) : undefined,
      energy: energy ? Number(energy) : undefined,
      mood,
      notes,
      frontPhoto,
      sidePhoto,
      backPhoto,
    });

    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      await createNotification({
        recipient: admin._id,
        sender: userId,
        title: "Nouveau check-in",
        message: "Un client a envoyé un nouveau check-in.",
        type: "checkin",
        link: "/dashboard/checkins",
      });
    }

    res.status(201).json({
      message: "Check-in sent successfully",
      checkIn,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create check-in",
    });
  }
};

export const getMyCheckIns = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const checkIns = await CheckIn.find({
      user: userId,
    }).sort({ date: -1 });

    res.json({ checkIns });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch check-ins",
    });
  }
};

export const getCheckInsAdmin = async (_req: Request, res: Response) => {
  try {
    const checkIns = await CheckIn.find()
      .populate("user", "fullName email phone")
      .sort({ createdAt: -1 });

    res.json({ checkIns });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch check-ins",
    });
  }
};

export const getCheckInsByUserAdmin = async (req: Request, res: Response) => {
  try {
    const checkIns = await CheckIn.find({
      user: req.params.userId,
    })
      .populate("user", "fullName email phone")
      .sort({ date: -1 });

    res.json({ checkIns });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch user check-ins",
    });
  }
};

export const addCoachFeedback = async (req: Request, res: Response) => {
  try {
    const coachId = req.user?.userId;
    const { feedback } = req.body;

    if (!feedback) {
      return res.status(400).json({
        message: "feedback is required",
      });
    }

    const checkIn = await CheckIn.findByIdAndUpdate(
      req.params.id,
      {
        coachFeedback: feedback,
        feedbackDate: new Date(),
      },
      { new: true }
    ).populate("user", "fullName email phone");

    if (!checkIn) {
      return res.status(404).json({
        message: "Check-in not found",
      });
    }

    const user: any = checkIn.user;

    await createNotification({
      recipient: user._id,
      sender: coachId,
      title: "Feedback du coach",
      message: "Votre coach a ajouté un feedback à votre check-in.",
      type: "checkin",
      link: "/user/checkins",
    });

    res.json({
      message: "Feedback added successfully",
      checkIn,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to add feedback",
    });
  }
};

export const deleteCheckIn = async (req: Request, res: Response) => {
  try {
    await CheckIn.findByIdAndDelete(req.params.id);

    res.json({
      message: "Check-in deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete check-in",
    });
  }
};