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
  "https://task-management-frontend-uhsr.vercel.app"
];

// Dynamically add Vercel deployment URLs if available
if (process.env.VERCEL_URL) {
  // For production Vercel deployments (main branch)
  if (process.env.NODE_ENV === 'production') {
    allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
  } else {
    // For preview deployments (Vercel automatically provides a URL for each PR)
    allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
    // Also consider VERCEL_BRANCH_URL for specific branch previews
    if (process.env.VERCEL_BRANCH_URL) {
      allowedOrigins.push(`https://${process.env.VERCEL_BRANCH_URL}`);
    }
  }
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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

