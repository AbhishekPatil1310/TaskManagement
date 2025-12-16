import { io } from "../server";

export function emitTaskUpdated(
  taskId: string,
  updates: Record<string, unknown>
) {
  io.emit("task:updated", {
    taskId,
    updates
  });
}


export function emitNotification(userId: string) {
  io.to(userId).emit("notification");
}