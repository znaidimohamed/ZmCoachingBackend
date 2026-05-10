"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    port: process.env.PORT || "5000",
    mongoUri: process.env.MONGO_URI || "",
    jwtSecret: process.env.JWT_SECRET || "default_secret",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
    adminName: process.env.ADMIN_NAME || "Super Admin",
    adminEmail: process.env.ADMIN_EMAIL || "admin@coachingapp.com",
    adminPassword: process.env.ADMIN_PASSWORD || "Admin123*"
};
