"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchaseRequest = exports.updatePurchaseStatus = exports.getMyPurchaseRequests = exports.getPurchaseRequestsAdmin = exports.createPurchaseRequest = void 0;
const purchaseRequest_model_1 = require("../models/purchaseRequest.model");
const course_model_1 = require("../models/course.model");
const pack_model_1 = require("../models/pack.model");
const createPurchaseRequest = async (req, res) => {
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
        let item = null;
        if (itemType === "course") {
            item = await course_model_1.Course.findById(itemId);
        }
        if (itemType === "pack") {
            item = await pack_model_1.Pack.findById(itemId);
        }
        if (!item) {
            return res.status(404).json({
                message: "Item not found",
            });
        }
        const itemTitle = itemType === "course" ? item.title : item.name;
        const request = await purchaseRequest_model_1.PurchaseRequest.create({
            user: userId,
            itemType,
            itemId,
            itemTitle,
            itemPrice: item.price,
            message,
        });
        res.status(201).json({
            message: "Purchase request created successfully",
            request,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create purchase request",
        });
    }
};
exports.createPurchaseRequest = createPurchaseRequest;
const getPurchaseRequestsAdmin = async (_req, res) => {
    try {
        const requests = await purchaseRequest_model_1.PurchaseRequest.find()
            .populate("user", "fullName email phone")
            .sort({ createdAt: -1 });
        res.json({ requests });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch purchase requests",
        });
    }
};
exports.getPurchaseRequestsAdmin = getPurchaseRequestsAdmin;
const getMyPurchaseRequests = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const requests = await purchaseRequest_model_1.PurchaseRequest.find({ user: userId }).sort({
            createdAt: -1,
        });
        res.json({ requests });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch my purchase requests",
        });
    }
};
exports.getMyPurchaseRequests = getMyPurchaseRequests;
const updatePurchaseStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["pending", "paid", "cancelled"].includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }
        const request = await purchaseRequest_model_1.PurchaseRequest.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate("user", "fullName email phone");
        if (!request) {
            return res.status(404).json({
                message: "Purchase request not found",
            });
        }
        res.json({
            message: "Purchase request status updated",
            request,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to update purchase request",
        });
    }
};
exports.updatePurchaseStatus = updatePurchaseStatus;
const deletePurchaseRequest = async (req, res) => {
    try {
        await purchaseRequest_model_1.PurchaseRequest.findByIdAndDelete(req.params.id);
        res.json({
            message: "Purchase request deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete purchase request",
        });
    }
};
exports.deletePurchaseRequest = deletePurchaseRequest;
