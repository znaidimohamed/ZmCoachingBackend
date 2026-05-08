import mongoose, { Document, Schema } from "mongoose";

export interface ISchedule extends Document {
  user: mongoose.Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  type: string;
  notes?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Training",
    },
    notes: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);