import mongoose, { Document, Schema } from "mongoose";

export interface ICheckInFeedback {
  message: string;
  createdAt: Date;
}

export interface ICheckIn extends Document {
  user: mongoose.Types.ObjectId;
  date: Date;
  weight: number;
  sleep?: number;
  energy?: number;
  mood?: string;
  notes?: string;
  frontPhoto?: string;
  sidePhoto?: string;
  backPhoto?: string;

  feedbacks: ICheckInFeedback[];

  coachFeedback?: string;
  feedbackDate?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const feedbackSchema = new Schema<ICheckInFeedback>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: true,
  }
);

const checkInSchema = new Schema<ICheckIn>(
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

    sleep: {
      type: Number,
      min: 0,
      max: 10,
    },

    energy: {
      type: Number,
      min: 0,
      max: 10,
    },

    mood: {
      type: String,
    },

    notes: {
      type: String,
    },

    frontPhoto: {
      type: String,
    },

    sidePhoto: {
      type: String,
    },

    backPhoto: {
      type: String,
    },

    feedbacks: {
      type: [feedbackSchema],
      default: [],
    },

    coachFeedback: {
      type: String,
    },

    feedbackDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const CheckIn = mongoose.model<ICheckIn>("CheckIn", checkInSchema);