import { Types } from "mongoose";
import {
  Notification,
  NotificationType,
} from "../models/notification.model";

type CreateNotificationPayload = {
  recipient: string | Types.ObjectId;
  sender?: string | Types.ObjectId;
  title: string;
  message: string;
  type?: NotificationType;
  link?: string;
};

export const createNotification = async ({
  recipient,
  sender,
  title,
  message,
  type = "system",
  link,
}: CreateNotificationPayload) => {
  return Notification.create({
    recipient,
    sender,
    title,
    message,
    type,
    link,
  });
};