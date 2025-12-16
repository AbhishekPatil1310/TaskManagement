import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import userRoutes from "./routes/user.routes";
import taskRoutes from "./routes/task.routes";
import notificationroute from "./routes/notification.routes";




const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://task-management-frontend-uhsr.vercel.app",
  "https://task-management-frontend-uhsr-abhisheks-projects-680a2fd9.vercel.app",
  "https://task-management-frontend-git-bf3603-abhisheks-projects-680a2fd9.vercel.app",
  "https://task-management-frontend-uhsr-n19swj537.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

// ✅ SAFE TO MOUNT ROUTES NOW
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notifications", notificationroute);



// ❗ error handler must be LAST
app.use(errorHandler);

export default app;

