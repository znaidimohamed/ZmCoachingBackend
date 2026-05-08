import { connectDB } from "../config/db";
import { env } from "../config/env";
import { User } from "../models/user.model";
import { hashPassword } from "./hash";

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: env.adminEmail.toLowerCase() });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await hashPassword(env.adminPassword);

    await User.create({
      fullName: env.adminName,
      email: env.adminEmail.toLowerCase(),
      password: hashedPassword,
      role: "admin",
      isActive: true
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

seedAdmin();