import mongoose, { Document, Schema } from "mongoose";

export interface ITrainingProgram extends Document {
  name: string;
  duration: string;
  level: string;
  description: string;
  pdfUrl?: string;
  pdfName?: string;
  assignedUsers: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const trainingProgramSchema = new Schema<ITrainingProgram>(
  {
    name: { type: String, required: true },
    duration: { type: String, required: true },
    level: { type: String, required: true },
    description: { type: String, required: true },

    pdfUrl: { type: String },
    pdfName: { type: String },

    assignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const TrainingProgram = mongoose.model<ITrainingProgram>(
  "TrainingProgram",
  trainingProgramSchema
);