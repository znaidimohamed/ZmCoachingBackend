"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myProfile = exports.updateUserProfile = exports.updateUserStatus = exports.listUsers = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const createUser = async (req, res) => {
    try {
        const { fullName, email, password, role } = req.body;
        if (!fullName || !email || !password) {
            res.status(400).json({
                message: "fullName, email and password are required",
            });
            return;
        }
        const user = await (0, user_service_1.createUserByAdmin)({
            fullName,
            email,
            password,
            role,
        });
        res.status(201).json({
            message: "User created successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to create user",
        });
    }
};
exports.createUser = createUser;
const listUsers = async (_req, res) => {
    try {
        const users = await (0, user_service_1.getAllUsers)();
        res.status(200).json({
            message: "Users fetched successfully",
            users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error.message || "Failed to fetch users",
        });
    }
};
exports.listUsers = listUsers;
const updateUserStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await (0, user_service_1.toggleUserStatus)(id);
        res.status(200).json({
            message: "User status updated successfully",
            user,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to update status",
        });
    }
};
exports.updateUserStatus = updateUserStatus;
const updateUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const { age, height, weight, goal, activityLevel, phone } = req.body;
        const user = await (0, user_service_1.updateUserProfileByAdmin)(id, {
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
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to update user profile",
        });
    }
};
exports.updateUserProfile = updateUserProfile;
const myProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const profile = await (0, user_service_1.getMyProfile)(userId);
        res.status(200).json({
            message: "Profile fetched successfully",
            profile,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Failed to fetch profile",
        });
    }
};
exports.myProfile = myProfile;
