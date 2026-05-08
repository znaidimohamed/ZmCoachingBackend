import { Request, Response } from "express";
import { Pack } from "../models/pack.model";

export const createPack = async (req: Request, res: Response) => {
  try {
    const { name, subtitle, price, duration, features, isPopular } = req.body;

    const pack = await Pack.create({
      name,
      subtitle,
      price,
      duration,
      features: Array.isArray(features)
        ? features
        : String(features).split("\n").filter(Boolean),
      isPopular: isPopular === true || isPopular === "true",
    });

    res.status(201).json({ message: "Pack created successfully", pack });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPacks = async (_req: Request, res: Response) => {
  const packs = await Pack.find({ isActive: true }).sort({ createdAt: -1 });
  res.json({ packs });
};

export const getAllPacksAdmin = async (_req: Request, res: Response) => {
  const packs = await Pack.find().sort({ createdAt: -1 });
  res.json({ packs });
};

export const deletePack = async (req: Request, res: Response) => {
  await Pack.findByIdAndDelete(req.params.id);
  res.json({ message: "Pack deleted successfully" });
};

export const togglePackStatus = async (req: Request, res: Response) => {
  const pack = await Pack.findById(req.params.id);

  if (!pack) {
    return res.status(404).json({ message: "Pack not found" });
  }

  pack.isActive = !pack.isActive;
  await pack.save();

  res.json({ message: "Pack status updated", pack });
};