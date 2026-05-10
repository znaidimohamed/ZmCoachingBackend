"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.loginUser = void 0;
const user_model_1 = require("../models/user.model");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const loginUser = async (email, password) => {
    const user = await user_model_1.User.findOne({
        email: email.toLowerCase(),
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    if (!user.isActive) {
        throw new Error("This account is disabled");
    }
    const isMatch = await (0, hash_1.comparePassword)(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password");
    }
    const token = (0, jwt_1.generateToken)({
        userId: user._id.toString(),
        role: user.role,
    });
    return {
        token,
        user: {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
};
exports.loginUser = loginUser;
const registerUser = async ({ fullName, email, password, }) => {
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
        role: "user",
    });
    const token = (0, jwt_1.generateToken)({
        userId: user._id.toString(),
        role: user.role,
    });
    return {
        token,
        user: {
            id: user._id.toString(),
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
};
exports.registerUser = registerUser;
