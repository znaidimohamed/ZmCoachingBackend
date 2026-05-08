import mongoose, { Document, Schema } from "mongoose";

export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: "new" | "contacted";
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "contacted"], default: "new" },
  },
  { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", leadSchema);