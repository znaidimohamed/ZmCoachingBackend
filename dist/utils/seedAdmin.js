"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const user_model_1 = require("../models/user.model");
const hash_1 = require("./hash");
const seedAdmin = async () => {
    try {
        await (0, db_1.connectDB)();
        const existingAdmin = await user_model_1.User.findOne({ email: env_1.env.adminEmail.toLowerCase() });
        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }
        const hashedPassword = await (0, hash_1.hashPassword)(env_1.env.adminPassword);
        await user_model_1.User.create({
            fullName: env_1.env.adminName,
            email: env_1.env.adminEmail.toLowerCase(),
            password: hashedPassword,
            role: "admin",
            isActive: true
        });
        console.log("Admin created successfully");
        process.exit(0);
    }
    catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};
seedAdmin();
