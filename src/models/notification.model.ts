import mongoose, { Document, Schema, Types } from "mongoose";

export type NotificationType =
  | "message"
  | "nutrition"
  | "training"
  | "progress"
  | "checkin"
  | "schedule"
  | "system";

export interface INotification extends Document {
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: [
        "message",
        "nutrition",
        "training",
        "progress",
        "checkin",
        "schedule",
        "system",
      ],
      default: "system",
    },

    link: {
      type: String,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);