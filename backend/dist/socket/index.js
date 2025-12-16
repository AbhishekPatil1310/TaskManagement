"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitTaskUpdated = emitTaskUpdated;
exports.emitNotification = emitNotification;
const server_1 = require("../server");
function emitTaskUpdated(taskId, updates) {
    server_1.io.emit("task:updated", {
        taskId,
        updates
    });
}
function emitNotification(userId) {
    server_1.io.to(userId).emit("notification");
}
