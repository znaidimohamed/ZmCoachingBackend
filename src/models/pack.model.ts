import mongoose, { Document, Schema } from "mongoose";

export interface IPack extends Document {
  name: string;
  subtitle: string;
  price: string;
  duration: string;
  features: string[];
  isPopular: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const packSchema = new Schema<IPack>(
  {
    name: { type: String, required: true },
    subtitle: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    features: [{ type: String, required: true }],
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Pack = mongoose.model<IPack>("Pack", packSchema);