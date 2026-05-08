import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "admin" | "user";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;

  // 👇 NEW PROFILE FIELDS
  age?: number;
  height?: number; // cm
  weight?: number; // kg
  goal?: string;
  activityLevel?: string;
  phone?: string;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    // 👇 PROFILE
    age: {
      type: Number,
    },

    height: {
      type: Number,
    },

    weight: {
      type: Number,
    },

    goal: {
      type: String,
    },

    activityLevel: {
      type: String,
      enum: ["low", "medium", "high"],
    },

    phone: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);