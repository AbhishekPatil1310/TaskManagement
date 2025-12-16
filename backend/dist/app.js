"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const task_routes_1 = __importDefault(require("./routes/task.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://task-management-frontend-uhsr.vercel.app"
];
// Dynamically add Vercel deployment URLs if available
if (process.env.VERCEL_URL) {
    // For production Vercel deployments (main branch)
    if (process.env.NODE_ENV === 'production') {
        allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
    }
    else {
        // For preview deployments (Vercel automatically provides a URL for each PR)
        allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
        // Also consider VERCEL_BRANCH_URL for specific branch previews
        if (process.env.VERCEL_BRANCH_URL) {
            allowedOrigins.push(`https://${process.env.VERCEL_BRANCH_URL}`);
        }
    }
}
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.get("/health", (_, res) => {
    res.json({ status: "ok" });
});
// ✅ SAFE TO MOUNT ROUTES NOW
app.use("/auth", auth_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/tasks", task_routes_1.default);
app.use("/notifications", notification_routes_1.default);
// ❗ error handler must be LAST
app.use(error_middleware_1.errorHandler);
exports.default = app;
