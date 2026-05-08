import mongoose, { Document, Schema } from "mongoose";

export type CourseCategory = "training" | "nutrition";

export interface ICourse extends Document {
  title: string;
  category: CourseCategory;
  description: string;
  price: string;
  duration?: string;
  level?: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true, trim: true },

    category: {
      type: String,
      enum: ["training", "nutrition"],
      required: true,
    },

    description: { type: String, required: true },

    price: { type: String, required: true },

    duration: { type: String },

    level: { type: String },

    features: [{ type: String, required: true }],

    isPopular: { type: Boolean, default: false },

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Course = mongoose.model<ICourse>("Course", courseSchema);