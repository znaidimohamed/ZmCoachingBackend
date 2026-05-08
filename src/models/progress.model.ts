import mongoose, { Document, Schema } from "mongoose";

export interface IProgressEntry extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  weight: number;
  waist?: number;
  chest?: number;
  arms?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const progressSchema = new Schema<IProgressEntry>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      default: Date.now,
    },

    weight: {
      type: Number,
      required: true,
    },

    waist: {
      type: Number,
    },

    chest: {
      type: Number,
    },

    arms: {
      type: Number,
    },

    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const ProgressEntry = mongoose.model<IProgressEntry>(
  "ProgressEntry",
  progressSchema
);