import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "5000",
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  adminName: process.env.ADMIN_NAME || "Super Admin",
  adminEmail: process.env.ADMIN_EMAIL || "admin@coachingapp.com",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin123*"
};