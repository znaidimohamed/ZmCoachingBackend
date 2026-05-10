"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransformation = exports.getAllTransformationsAdmin = exports.getTransformations = exports.createTransformation = void 0;
const transformation_model_1 = require("../models/transformation.model");
const createTransformation = async (req, res) => {
    try {
        const { name, title, description } = req.body;
        const files = req.files;
        if (!name || !title || !description) {
            return res.status(400).json({ message: "name, title and description are required" });
        }
        if (!files?.beforeImage || !files?.afterImage) {
            return res.status(400).json({ message: "beforeImage and afterImage are required" });
        }
        const beforeImage = `/uploads/transformations/${files.beforeImage[0].filename}`;
        const afterImage = `/uploads/transformations/${files.afterImage[0].filename}`;
        const transformation = await transformation_model_1.Transformation.create({
            name,
            title,
            description,
            beforeImage,
            afterImage,
        });
        res.status(201).json({
            message: "Transformation created successfully",
            transformation,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTransformation = createTransformation;
const getTransformations = async (_req, res) => {
    const transformations = await transformation_model_1.Transformation.find({ isActive: true }).sort({
        createdAt: -1,
    });
    res.json({ transformations });
};
exports.getTransformations = getTransformations;
const getAllTransformationsAdmin = async (_req, res) => {
    const transformations = await transformation_model_1.Transformation.find().sort({ createdAt: -1 });
    res.json({ transformations });
};
exports.getAllTransformationsAdmin = getAllTransformationsAdmin;
const deleteTransformation = async (req, res) => {
    await transformation_model_1.Transformation.findByIdAndDelete(req.params.id);
    res.json({ message: "Transformation deleted successfully" });
};
exports.deleteTransformation = deleteTransformation;
