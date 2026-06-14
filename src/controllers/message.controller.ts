import { Request, Response } from "express";
import mongoose from "mongoose";
import { Message } from "../models/message.model";
import { User } from "../models/user.model";

export const getChatClientsAdmin = async (_req: Request, res: Response) => {
  try {
    const clients = await User.find({
      role: "user",
      isActive: true,
    })
      .select("fullName email phone")
      .sort({ fullName: 1 });

    res.json({ clients });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch clients",
    });
  }
};

export const getConversationAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.userId;
    const userId = req.params.userId as string;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const messages = await Message.find({
      $or: [
        { sender: adminId, receiver: userId },
        { sender: userId, receiver: adminId },
      ],
    })
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role")
      .sort({ createdAt: 1 });

    await Message.updateMany(
      {
        sender: userId,
        receiver: adminId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({ messages });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch conversation",
    });
  }
};

export const sendMessageAdmin = async (req: Request, res: Response) => {
  try {
    const adminId = req.user?.userId;
    const userId = req.params.userId as string;
    const { text } = req.body;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const receiver = await User.findOne({
      _id: userId,
      role: "user",
    });

    if (!receiver) {
      return res.status(404).json({ message: "Client not found" });
    }

    const message = await Message.create({
      sender: adminId,
      receiver: userId,
      text: text.trim(),
    });

    const populatedMessage = await message.populate([
      { path: "sender", select: "fullName email role" },
      { path: "receiver", select: "fullName email role" },
    ]);

    res.status(201).json({
      message: "Message sent successfully",
      chatMessage: populatedMessage,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to send message",
    });
  }
};

export const getMyConversation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const admin = await User.findOne({ role: "admin" }).select(
      "fullName email role"
    );

    if (!admin) {
      return res.status(404).json({ message: "Coach not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: admin._id },
        { sender: admin._id, receiver: userId },
      ],
    })
      .populate("sender", "fullName email role")
      .populate("receiver", "fullName email role")
      .sort({ createdAt: 1 });

    await Message.updateMany(
      {
        sender: admin._id,
        receiver: userId,
        isRead: false,
      },
      {
        isRead: true,
      }
    );

    res.json({
      coach: admin,
      messages,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch conversation",
    });
  }
};

export const sendMyMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { text } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Message is required" });
    }

    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.status(404).json({ message: "Coach not found" });
    }

    const message = await Message.create({
      sender: userId,
      receiver: admin._id,
      text: text.trim(),
    });

    const populatedMessage = await message.populate([
      { path: "sender", select: "fullName email role" },
      { path: "receiver", select: "fullName email role" },
    ]);

    res.status(201).json({
      message: "Message sent successfully",
      chatMessage: populatedMessage,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to send message",
    });
  }
};