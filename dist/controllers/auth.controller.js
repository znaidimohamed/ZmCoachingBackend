"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = exports.signIn = void 0;
const auth_service_1 = require("../services/auth.service");
const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required",
            });
            return;
        }
        const data = await (0, auth_service_1.loginUser)(email, password);
        res.status(200).json(data);
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Login failed",
        });
    }
};
exports.signIn = signIn;
const signUp = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            res.status(400).json({
                message: "All fields are required",
            });
            return;
        }
        const data = await (0, auth_service_1.registerUser)({
            fullName,
            email,
            password,
        });
        res.status(201).json(data);
    }
    catch (error) {
        res.status(400).json({
            message: error.message || "Signup failed",
        });
    }
};
exports.signUp = signUp;
