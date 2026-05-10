import { Request, Response } from "express";
import {
  createUserByAdmin,
  getAllUsers,
  getMyProfile,
  toggleUserStatus,
  updateUserProfileByAdmin,
} from "../services/user.service";

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      res.status(400).json({
        message: "fullName, email and password are required",
      });
      return;
    }

    const user = await createUserByAdmin({
      fullName,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create user",
    });
  }
};

export const listUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch users",
    });
  }
};

export const updateUserStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const user = await toggleUserStatus(id);

    res.status(200).json({
      message: "User status updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to update status",
    });
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id as string;
    const { age, height, weight, goal, activityLevel, phone } = req.body;

    const user = await updateUserProfileByAdmin(id, {
      age,
      height,
      weight,
      goal,
      activityLevel,
      phone,
    });

    res.status(200).json({
      message: "User profile updated successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to update user profile",
    });
  }
};

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const profile = await getMyProfile(userId);

    res.status(200).json({
      message: "Profile fetched successfully",
      profile,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to fetch profile",
    });
  }
};