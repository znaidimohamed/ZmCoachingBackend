import { Router } from "express";
import { coachChat } from "../controllers/ai.controller";

const router = Router();

router.post("/chat", coachChat);

export default router;