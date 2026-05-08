import { Request, Response } from "express";
import { getAdminDashboardStats } from "../services/dashboard.service";
import { getMyProfile } from "../services/user.service";

export const adminDashboard = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const stats = await getAdminDashboardStats();

  res.json({
    message: "Admin dashboard",
    stats
  });
};

export const userDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user?.userId;

  const profile = await getMyProfile(userId!);

  res.json({
    message: "User dashboard",
    profile
  });
};