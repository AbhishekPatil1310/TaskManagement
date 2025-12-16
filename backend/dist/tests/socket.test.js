"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)("http://localhost:5000", {
    withCredentials: true,
    transports: ["websocket"] // avoid polling noise
});
socket.on("connect", () => {
    console.log("✅ Connected to socket server");
    console.log("Socket ID:", socket.id);
});
socket.on("task:updated", (payload) => {
    console.log("🔥 task:updated event received");
    console.log(payload);
});
socket.on("disconnect", () => {
    console.log("❌ Disconnected from socket server");
});
socket.on("connect_error", (err) => {
    console.error("❌ Connection error:", err.message);
});
