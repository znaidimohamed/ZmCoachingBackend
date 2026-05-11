import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import transformationRoutes from "./routes/transformation.routes";
import nutritionPlanRoutes from "./routes/nutritionPlan.routes"
import packRoutes from "./routes/pack.routes";
import trainingProgramRoutes from "./routes/trainingProgram.routes";
import progressRoutes from "./routes/progress.routes";
import courseRoutes from "./routes/course.routes";
import purchaseRequestRoutes from "./routes/purchaseRequest.routes";
import scheduleRoutes from "./routes/schedule.routes";
import checkInRoutes from "./routes/checkin.routes";
import aiRoutes from "./routes/ai.routes";
import seedRoutes from "./routes/seed.routes";
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";
import leadRoutes from "./routes/lead.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


app.get("/api/health", (_req, res) => {
  res.status(200).json({
    message: "API is running successfully"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/transformations", transformationRoutes);
app.use("/api/packs", packRoutes);
app.use("/api/nutrition-plans", nutritionPlanRoutes);
app.use("/api/training-programs", trainingProgramRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/checkins", checkInRoutes);
app.use("/api/purchase-requests", purchaseRequestRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/seed", seedRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;