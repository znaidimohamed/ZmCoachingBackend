import { User } from "../models/user.model";
import { Lead } from "../models/lead.model";
import { PurchaseRequest } from "../models/purchaseRequest.model";
import { ProgressEntry } from "../models/progress.model";
import { Schedule } from "../models/schedule.model";
import { Course } from "../models/course.model";
import { Pack } from "../models/pack.model";
import { NutritionPlan } from "../models/nutritionPlan.model";
import { TrainingProgram } from "../models/trainingProgram.model";

export const getAdminDashboardStats = async () => {
  const [
    totalUsers,
    activeUsers,
    totalLeads,
    newLeads,
    totalPurchases,
    pendingPurchases,
    paidPurchases,
    activeSchedules,
    totalCourses,
    totalPacks,
    totalNutritionPlans,
    totalTrainingPrograms,
    latestLeads,
    latestPurchases,
    latestProgress,
  ] = await Promise.all([
    User.countDocuments({ role: "user" }),
    User.countDocuments({ role: "user", isActive: true }),

    Lead.countDocuments(),
    Lead.countDocuments({ status: "new" }),

    PurchaseRequest.countDocuments(),
    PurchaseRequest.countDocuments({ status: "pending" }),
    PurchaseRequest.countDocuments({ status: "paid" }),

    Schedule.countDocuments({ isActive: true }),

    Course.countDocuments({ isActive: true }),
    Pack.countDocuments({ isActive: true }),
    NutritionPlan.countDocuments({ isActive: true }),
    TrainingProgram.countDocuments({ isActive: true }),

    Lead.find().sort({ createdAt: -1 }).limit(5),

    PurchaseRequest.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5),

    ProgressEntry.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 })
      .limit(5),
  ]);

  return {
    totals: {
      totalUsers,
      activeUsers,
      totalLeads,
      newLeads,
      totalPurchases,
      pendingPurchases,
      paidPurchases,
      activeSchedules,
      totalCourses,
      totalPacks,
      totalNutritionPlans,
      totalTrainingPrograms,
    },
    latest: {
      leads: latestLeads,
      purchases: latestPurchases,
      progress: latestProgress,
    },
  };
};