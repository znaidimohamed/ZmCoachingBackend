import { Request, Response } from "express";
import { Notification } from "../models/notification.model";

export const getMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const notifications = await Notification.find({
      recipient: userId,
    })
      .populate("sender", "fullName email role")
      .sort({ createdAt: -1 })
      .limit(50);

    const unreadCount = await Notification.countDocuments({
      recipient: userId,
      isRead: false,
    });

    res.json({
      notifications,
      unreadCount,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch notifications",
    });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const notification = await Notification.findOneAndUpdate(
      {
        _id: req.params.id,
        recipient: userId,
      },
      {
        isRead: true,
      },
      {
        new: true,
      }
    );

    if (!notification) {
      return res.status(404).json({
        message: "Notification not found",
      });
    }

    res.json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update notification",
    });
  }
};

export const markAllNotificationsAsRead = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    await Notification.updateMany(
      {
        recipient: userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      message: "All notifications marked as read",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update notifications",
    });
  }
};

export const deleteMyNotifications = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    await Notification.deleteMany({
      recipient: userId,
    });

    res.json({
      message: "Notifications deleted",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete notifications",
    });
  }
};