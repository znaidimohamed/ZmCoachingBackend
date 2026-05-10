"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.togglePackStatus = exports.deletePack = exports.getAllPacksAdmin = exports.getPacks = exports.createPack = void 0;
const pack_model_1 = require("../models/pack.model");
const createPack = async (req, res) => {
    try {
        const { name, subtitle, price, duration, features, isPopular } = req.body;
        const pack = await pack_model_1.Pack.create({
            name,
            subtitle,
            price,
            duration,
            features: Array.isArray(features)
                ? features
                : String(features).split("\n").filter(Boolean),
            isPopular: isPopular === true || isPopular === "true",
        });
        res.status(201).json({ message: "Pack created successfully", pack });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createPack = createPack;
const getPacks = async (_req, res) => {
    const packs = await pack_model_1.Pack.find({ isActive: true }).sort({ createdAt: -1 });
    res.json({ packs });
};
exports.getPacks = getPacks;
const getAllPacksAdmin = async (_req, res) => {
    const packs = await pack_model_1.Pack.find().sort({ createdAt: -1 });
    res.json({ packs });
};
exports.getAllPacksAdmin = getAllPacksAdmin;
const deletePack = async (req, res) => {
    await pack_model_1.Pack.findByIdAndDelete(req.params.id);
    res.json({ message: "Pack deleted successfully" });
};
exports.deletePack = deletePack;
const togglePackStatus = async (req, res) => {
    const pack = await pack_model_1.Pack.findById(req.params.id);
    if (!pack) {
        return res.status(404).json({ message: "Pack not found" });
    }
    pack.isActive = !pack.isActive;
    await pack.save();
    res.json({ message: "Pack status updated", pack });
};
exports.togglePackStatus = togglePackStatus;
