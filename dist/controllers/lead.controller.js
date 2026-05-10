"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLead = exports.toggleLeadStatus = exports.getLeadsAdmin = exports.createLead = void 0;
const lead_model_1 = require("../models/lead.model");
const createLead = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({
                message: "name, email and message are required",
            });
        }
        const lead = await lead_model_1.Lead.create({ name, email, phone, message });
        res.status(201).json({
            message: "Lead sent successfully",
            lead,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createLead = createLead;
const getLeadsAdmin = async (_req, res) => {
    const leads = await lead_model_1.Lead.find().sort({ createdAt: -1 });
    res.json({ leads });
};
exports.getLeadsAdmin = getLeadsAdmin;
const toggleLeadStatus = async (req, res) => {
    const lead = await lead_model_1.Lead.findById(req.params.id);
    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }
    lead.status = lead.status === "new" ? "contacted" : "new";
    await lead.save();
    res.json({ message: "Lead status updated", lead });
};
exports.toggleLeadStatus = toggleLeadStatus;
const deleteLead = async (req, res) => {
    await lead_model_1.Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted successfully" });
};
exports.deleteLead = deleteLead;
