import { Request, Response } from "express";
import { Transformation } from "../models/transformation.model";

export const createTransformation = async (req: Request, res: Response) => {
  try {
    const { name, title, description } = req.body;
    const files = req.files as any;

    if (!name || !title || !description) {
      return res.status(400).json({ message: "name, title and description are required" });
    }

    if (!files?.beforeImage || !files?.afterImage) {
      return res.status(400).json({ message: "beforeImage and afterImage are required" });
    }

    const beforeImage = `/uploads/transformations/${files.beforeImage[0].filename}`;
    const afterImage = `/uploads/transformations/${files.afterImage[0].filename}`;

    const transformation = await Transformation.create({
      name,
      title,
      description,
      beforeImage,
      afterImage,
    });

    res.status(201).json({
      message: "Transformation created successfully",
      transformation,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransformations = async (_req: Request, res: Response) => {
  const transformations = await Transformation.find({ isActive: true }).sort({
    createdAt: -1,
  });

  res.json({ transformations });
};

export const getAllTransformationsAdmin = async (_req: Request, res: Response) => {
  const transformations = await Transformation.find().sort({ createdAt: -1 });

  res.json({ transformations });
};

export const deleteTransformation = async (req: Request, res: Response) => {
  await Transformation.findByIdAndDelete(req.params.id);

  res.json({ message: "Transformation deleted successfully" });
};