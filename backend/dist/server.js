"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const httpServer = http_1.default.createServer(app_1.default);
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3000",
    "https://your-prod-domain.com"
];
exports.io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        credentials: true
    }
});
exports.io.on("connection", (socket) => {
    const userId = socket.handshake.auth?.userId;
    if (userId) {
        socket.join(userId);
    }
    console.log("Socket connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
    });
});
httpServer.listen(env_1.env.PORT, () => {
    console.log(`Server running on port ${env_1.env.PORT}`);
});
