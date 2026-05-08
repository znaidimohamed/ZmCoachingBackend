import { Request, Response } from "express";
import { Lead } from "../models/lead.model";

export const createLead = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        message: "name, email and message are required",
      });
    }

    const lead = await Lead.create({ name, email, phone, message });

    res.status(201).json({
      message: "Lead sent successfully",
      lead,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getLeadsAdmin = async (_req: Request, res: Response) => {
  const leads = await Lead.find().sort({ createdAt: -1 });
  res.json({ leads });
};

export const toggleLeadStatus = async (req: Request, res: Response) => {
  const lead = await Lead.findById(req.params.id);

  if (!lead) {
    return res.status(404).json({ message: "Lead not found" });
  }

  lead.status = lead.status === "new" ? "contacted" : "new";
  await lead.save();

  res.json({ message: "Lead status updated", lead });
};

export const deleteLead = async (req: Request, res: Response) => {
  await Lead.findByIdAndDelete(req.params.id);
  res.json({ message: "Lead deleted successfully" });
};