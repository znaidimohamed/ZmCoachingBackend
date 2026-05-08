import mongoose, { Document, Schema } from "mongoose";

export interface ITransformation extends Document {
  name: string;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const transformationSchema = new Schema<ITransformation>(
  {
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    beforeImage: { type: String, required: true },
    afterImage: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Transformation = mongoose.model<ITransformation>(
  "Transformation",
  transformationSchema
);