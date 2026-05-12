"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransformation = exports.getAllTransformationsAdmin = exports.getTransformations = exports.createTransformation = void 0;
const transformation_model_1 = require("../models/transformation.model");
const uploadToCloudinary_1 = require("../utils/uploadToCloudinary");
const createTransformation = async (req, res) => {
    try {
        const { name, title, description } = req.body;
        const files = req.files;
        if (!name || !title || !description) {
            return res.status(400).json({
                message: "name, title and description are required",
            });
        }
        if (!files?.beforeImage?.[0] || !files?.afterImage?.[0]) {
            return res.status(400).json({
                message: "beforeImage and afterImage are required",
            });
        }
        const beforeUpload = await (0, uploadToCloudinary_1.uploadToCloudinary)(files.beforeImage[0].buffer, "zmcoaching/transformations", "image");
        const afterUpload = await (0, uploadToCloudinary_1.uploadToCloudinary)(files.afterImage[0].buffer, "zmcoaching/transformations", "image");
        const transformation = await transformation_model_1.Transformation.create({
            name,
            title,
            description,
            beforeImage: beforeUpload.secure_url,
            afterImage: afterUpload.secure_url,
        });
        res.status(201).json({
            message: "Transformation created successfully",
            transformation,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to create transformation",
        });
    }
};
exports.createTransformation = createTransformation;
const getTransformations = async (_req, res) => {
    try {
        const transformations = await transformation_model_1.Transformation.find({
            isActive: true,
        }).sort({
            createdAt: -1,
        });
        res.json({ transformations });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch transformations",
        });
    }
};
exports.getTransformations = getTransformations;
const getAllTransformationsAdmin = async (_req, res) => {
    try {
        const transformations = await transformation_model_1.Transformation.find().sort({
            createdAt: -1,
        });
        res.json({ transformations });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch transformations",
        });
    }
};
exports.getAllTransformationsAdmin = getAllTransformationsAdmin;
const deleteTransformation = async (req, res) => {
    try {
        await transformation_model_1.Transformation.findByIdAndDelete(req.params.id);
        res.json({
            message: "Transformation deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to delete transformation",
        });
    }
};
exports.deleteTransformation = deleteTransformation;
