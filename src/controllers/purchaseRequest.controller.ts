import { Request, Response } from "express";
import { PurchaseRequest } from "../models/purchaseRequest.model";
import { Course } from "../models/course.model";
import { Pack } from "../models/pack.model";
import { User } from "../models/user.model";
import { createNotification } from "../utils/createNotification";

export const createPurchaseRequest = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { itemType, itemId, message } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!itemType || !itemId) {
      return res.status(400).json({
        message: "itemType and itemId are required",
      });
    }

    let item: any = null;

    if (itemType === "course") {
      item = await Course.findById(itemId);
    }

    if (itemType === "pack") {
      item = await Pack.findById(itemId);
    }

    if (!item) {
      return res.status(404).json({
        message: "Item not found",
      });
    }

    const itemTitle = itemType === "course" ? item.title : item.name;

    const request = await PurchaseRequest.create({
      user: userId,
      itemType,
      itemId,
      itemTitle,
      itemPrice: item.price,
      message,
    });

    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      await createNotification({
        recipient: admin._id,
        sender: userId,
        title: "Nouvelle demande d’achat",
        message: `Un client a demandé: ${itemTitle}.`,
        type: "system",
        link: "/dashboard/purchase-requests",
      });
    }

    res.status(201).json({
      message: "Purchase request created successfully",
      request,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create purchase request",
    });
  }
};

export const getPurchaseRequestsAdmin = async (_req: Request, res: Response) => {
  try {
    const requests = await PurchaseRequest.find()
      .populate("user", "fullName email phone")
      .sort({ createdAt: -1 });

    res.json({ requests });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch purchase requests",
    });
  }
};

export const getMyPurchaseRequests = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    const requests = await PurchaseRequest.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.json({ requests });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch my purchase requests",
    });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  try {
    const coachId = req.user?.userId;
    const { status } = req.body;

    if (!["pending", "paid", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const request = await PurchaseRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "fullName email phone");

    if (!request) {
      return res.status(404).json({
        message: "Purchase request not found",
      });
    }

    const user: any = request.user;

    await createNotification({
      recipient: user._id,
      sender: coachId,
      title: "Demande d’achat mise à jour",
      message: `Votre demande "${request.itemTitle}" est maintenant: ${status}.`,
      type: "system",
      link: "/user",
    });

    res.json({
      message: "Purchase request status updated",
      request,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to update purchase request",
    });
  }
};

export const deletePurchaseRequest = async (req: Request, res: Response) => {
  try {
    await PurchaseRequest.findByIdAndDelete(req.params.id);

    res.json({
      message: "Purchase request deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete purchase request",
    });
  }
};