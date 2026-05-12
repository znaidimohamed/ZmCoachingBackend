"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = require("../models/user.model");
const hash_1 = require("../utils/hash");
const router = (0, express_1.Router)();
router.post("/admin", async (req, res) => {
    try {
        const secret = req.headers["x-seed-secret"];
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                message: "SEED_ADMIN_SECRET is missing",
            });
        }
        if (secret !== process.env.JWT_SECRET) {
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        const email = process.env.ADMIN_EMAIL || "admin@coachingapp.com";
        const password = process.env.ADMIN_PASSWORD || "Admin123*";
        const fullName = process.env.ADMIN_FULL_NAME || "ZM Admin";
        const existingAdmin = await user_model_1.User.findOne({
            email: email.toLowerCase(),
        });
        if (existingAdmin) {
            return res.status(200).json({
                message: "Admin already exists",
                admin: {
                    id: existingAdmin._id,
                    email: existingAdmin.email,
                    role: existingAdmin.role,
                },
            });
        }
        const hashedPassword = await (0, hash_1.hashPassword)(password);
        const admin = await user_model_1.User.create({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: "admin",
            isActive: true,
        });
        return res.status(201).json({
            message: "Admin seeded successfully",
            admin: {
                id: admin._id,
                email: admin.email,
                role: admin.role,
            },
        });
    }
    catch (error) {
        return res.status(500).json({
            message: error.message || "Seed admin failed",
        });
    }
});
exports.default = router;
