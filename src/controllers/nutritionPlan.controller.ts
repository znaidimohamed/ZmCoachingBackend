import { Request, Response } from "express";
import { NutritionPlan } from "../models/nutritionPlan.model";

export const createNutritionPlan = async (req: Request, res: Response) => {
  try {
    const {
      title,
      subtitle,
      description,
      calories,
      goal,
      meals,
      isPopular,
      assignedUsers,
    } = req.body;

    const plan = await NutritionPlan.create({
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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadPlanPdf = async (req: Request, res: Response) => {
  try {
    const plan = await NutritionPlan.findById(req.params.id);

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
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Public homepage nutrition plans.
 * These are the marketing/display plans.
 */
export const getNutritionPlans = async (_req: Request, res: Response) => {
  const plans = await NutritionPlan.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res.json({ plans });
};

/**
 * Admin sees all nutrition plans with assigned users populated.
 */
export const getAllNutritionPlansAdmin = async (_req: Request, res: Response) => {
  const plans = await NutritionPlan.find()
    .populate("assignedUsers", "fullName email role")
    .sort({ createdAt: -1 });

  res.json({ plans });
};

/**
 * Connected user sees only nutrition plans assigned to him.
 */
export const getMyNutritionPlans = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const plans = await NutritionPlan.find({
      isActive: true,
      assignedUsers: userId,
    }).sort({ createdAt: -1 });

    res.json({ plans });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch user nutrition plans",
    });
  }
};

export const updateNutritionPlanAssignedUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const { assignedUsers } = req.body;

    const plan = await NutritionPlan.findByIdAndUpdate(
      req.params.id,
      {
        assignedUsers: Array.isArray(assignedUsers) ? assignedUsers : [],
      },
      { new: true }
    ).populate("assignedUsers", "fullName email role");

    if (!plan) {
      return res.status(404).json({ message: "Nutrition plan not found" });
    }

    res.json({
      message: "Assigned users updated successfully",
      plan,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update assigned users",
    });
  }
};

export const deleteNutritionPlan = async (req: Request, res: Response) => {
  await NutritionPlan.findByIdAndDelete(req.params.id);

  res.json({ message: "Nutrition plan deleted successfully" });
};

export const toggleNutritionPlanStatus = async (req: Request, res: Response) => {
  const plan = await NutritionPlan.findById(req.params.id);

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