import mongoose, { Document, Schema } from "mongoose";

export type PurchaseType = "course" | "pack";
export type PurchaseStatus = "pending" | "paid" | "cancelled";

export interface IPurchaseRequest extends Document {
  user: mongoose.Types.ObjectId;
  itemType: PurchaseType;
  itemId: mongoose.Types.ObjectId;
  itemTitle: string;
  itemPrice: string;
  status: PurchaseStatus;
  message?: string;
  createdAt: Date;
  updatedAt: Date;
}

const purchaseRequestSchema = new Schema<IPurchaseRequest>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    itemType: {
      type: String,
      enum: ["course", "pack"],
      required: true,
    },

    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    itemTitle: {
      type: String,
      required: true,
    },

    itemPrice: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "cancelled"],
      default: "pending",
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PurchaseRequest = mongoose.model<IPurchaseRequest>(
  "PurchaseRequest",
  purchaseRequestSchema
);