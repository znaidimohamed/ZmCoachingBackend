import mongoose, { Document, Schema } from "mongoose";

export interface INutritionPlan extends Document {
  title: string;
  subtitle: string;
  description: string;
  calories: string;
  goal: string;
  meals: string[];
  pdfUrl?: string;
  pdfName?: string;
  assignedUsers: mongoose.Types.ObjectId[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const nutritionPlanSchema = new Schema<INutritionPlan>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    calories: { type: String, required: true },
    goal: { type: String, required: true },
    meals: [{ type: String, required: true }],

    pdfUrl: { type: String },
    pdfName: { type: String },

    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const NutritionPlan = mongoose.model<INutritionPlan>(
  "NutritionPlan",
  nutritionPlanSchema
);