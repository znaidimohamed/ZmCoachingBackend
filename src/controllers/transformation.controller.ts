import { Request, Response } from "express";
import { Transformation } from "../models/transformation.model";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";

export const createTransformation = async (req: Request, res: Response) => {
  try {
    const { name, title, description } = req.body;
    const files = req.files as any;

    if (!name || !title || !description) {
      return res.status(400).json({
        message: "name, title and description are required",
      });
    }

    if (!files?.beforeImage?.[0] || !files?.afterImage?.[0]) {
      return res.status(400).json({
        message: "beforeImage and afterImage are required",
      });
    }

    const beforeUpload = await uploadToCloudinary(
      files.beforeImage[0].buffer,
      "zmcoaching/transformations",
      "image"
    );

    const afterUpload = await uploadToCloudinary(
      files.afterImage[0].buffer,
      "zmcoaching/transformations",
      "image"
    );

    const transformation = await Transformation.create({
      name,
      title,
      description,
      beforeImage: beforeUpload.secure_url,
      afterImage: afterUpload.secure_url,
    });

    res.status(201).json({
      message: "Transformation created successfully",
      transformation,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to create transformation",
    });
  }
};

export const getTransformations = async (_req: Request, res: Response) => {
  try {
    const transformations = await Transformation.find({
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    res.json({ transformations });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch transformations",
    });
  }
};

export const getAllTransformationsAdmin = async (
  _req: Request,
  res: Response
) => {
  try {
    const transformations = await Transformation.find().sort({
      createdAt: -1,
    });

    res.json({ transformations });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch transformations",
    });
  }
};

export const deleteTransformation = async (req: Request, res: Response) => {
  try {
    await Transformation.findByIdAndDelete(req.params.id);

    res.json({
      message: "Transformation deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete transformation",
    });
  }
};