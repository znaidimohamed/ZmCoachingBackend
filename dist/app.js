"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const transformation_routes_1 = __importDefault(require("./routes/transformation.routes"));
const nutritionPlan_routes_1 = __importDefault(require("./routes/nutritionPlan.routes"));
const pack_routes_1 = __importDefault(require("./routes/pack.routes"));
const trainingProgram_routes_1 = __importDefault(require("./routes/trainingProgram.routes"));
const progress_routes_1 = __importDefault(require("./routes/progress.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const purchaseRequest_routes_1 = __importDefault(require("./routes/purchaseRequest.routes"));
const schedule_routes_1 = __importDefault(require("./routes/schedule.routes"));
const checkin_routes_1 = __importDefault(require("./routes/checkin.routes"));
const ai_routes_1 = __importDefault(require("./routes/ai.routes"));
const seed_routes_1 = __importDefault(require("./routes/seed.routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const lead_routes_1 = __importDefault(require("./routes/lead.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/api/health", (_req, res) => {
    res.status(200).json({
        message: "API is running successfully"
    });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/transformations", transformation_routes_1.default);
app.use("/api/packs", pack_routes_1.default);
app.use("/api/nutrition-plans", nutritionPlan_routes_1.default);
app.use("/api/training-programs", trainingProgram_routes_1.default);
app.use("/api/progress", progress_routes_1.default);
app.use("/api/courses", course_routes_1.default);
app.use("/api/leads", lead_routes_1.default);
app.use("/api/checkins", checkin_routes_1.default);
app.use("/api/purchase-requests", purchaseRequest_routes_1.default);
app.use("/api/ai", ai_routes_1.default);
app.use("/api/schedules", schedule_routes_1.default);
app.use("/api/seed", seed_routes_1.default);
app.use(error_middleware_1.notFoundHandler);
app.use(error_middleware_1.errorHandler);
exports.default = app;
