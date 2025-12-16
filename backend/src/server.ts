import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { env } from "./config/env";

const httpServer = http.createServer(app);
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "https://task-management-frontend-uhsr.vercel.app",
  "https://task-management-frontend-uhsr-abhisheks-projects-680a2fd9.vercel.app",
  "https://task-management-frontend-git-bf3603-abhisheks-projects-680a2fd9.vercel.app",
  "https://task-management-frontend-uhsr-n19swj537.vercel.app",
  "https://eclectic-brioche-a66956.netlify.app"
];

export const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth?.userId;

  if (userId) {
    socket.join(userId);
  }
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

httpServer.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

