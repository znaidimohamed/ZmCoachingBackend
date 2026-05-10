"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProfile = exports.updateUserProfileByAdmin = exports.toggleUserStatus = exports.getAllUsers = exports.createUserByAdmin = void 0;
const user_model_1 = require("../models/user.model");
const hash_1 = require("../utils/hash");
const createUserByAdmin = async ({ fullName, email, password, role = "user", }) => {
    const existingUser = await user_model_1.User.findOne({
        email: email.toLowerCase(),
    });
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    const user = await user_model_1.User.create({
        fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
    });
    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
    };
};
exports.createUserByAdmin = createUserByAdmin;
const getAllUsers = async () => {
    const users = await user_model_1.User.find({}, { password: 0 }).sort({ createdAt: -1 });
    return users.map((user) => ({
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }));
};
exports.getAllUsers = getAllUsers;
const toggleUserStatus = async (userId) => {
    const user = await user_model_1.User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    user.isActive = !user.isActive;
    await user.save();
    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        phone: user.phone,
        isActive: user.isActive,
    };
};
exports.toggleUserStatus = toggleUserStatus;
const updateUserProfileByAdmin = async (userId, data) => {
    const user = await user_model_1.User.findByIdAndUpdate(userId, {
        age: data.age,
        height: data.height,
        weight: data.weight,
        goal: data.goal,
        activityLevel: data.activityLevel,
        phone: data.phone,
    }, {
        new: true,
        runValidators: true,
        select: "-password",
    });
    if (!user) {
        throw new Error("User not found");
    }
    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
exports.updateUserProfileByAdmin = updateUserProfileByAdmin;
const getMyProfile = async (userId) => {
    const user = await user_model_1.User.findById(userId, { password: 0 });
    if (!user) {
        throw new Error("User not found");
    }
    return {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        age: user.age,
        height: user.height,
        weight: user.weight,
        goal: user.goal,
        activityLevel: user.activityLevel,
        phone: user.phone,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
exports.getMyProfile = getMyProfile;
