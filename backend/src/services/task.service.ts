import { TaskRepository } from "../repositories/task.repository";
import { NotificationRepository } from "../repositories/notification.repository";
import { CreateTaskInput, UpdateTaskInput } from "../dtos/task.dto";
import { prisma } from "../config/prisma";
import { emitTaskUpdated, emitNotification } from "../socket";
import { TaskStatus, TaskPriority } from "@prisma/client";

const taskRepo = new TaskRepository();
const notificationRepo = new NotificationRepository();

export class TaskService {
  async createTask(userId: string, data: CreateTaskInput) {
    if (data.assignedToId) {
      const user = await prisma.user.findUnique({
        where: { id: data.assignedToId }
      });

      if (!user) {
        throw { status: 400, message: "Assigned user not found" };
      }
    }

    const task = await taskRepo.create({
      ...data,
      creatorId: userId
    });

    // 🔔 ASSIGNMENT NOTIFICATION
    if (data.assignedToId && data.assignedToId !== userId) {
      await notificationRepo.create(
        data.assignedToId,
        `You have been assigned a task: "${task.title}"`
      );

      // 🔥 REAL-TIME PUSH
      emitNotification(data.assignedToId);
    }

    return task;
  }

  async updateTask(
    taskId: string,
    userId: string,
    data: UpdateTaskInput
  ) {
    const task = await taskRepo.findById(taskId);
    if (!task) {
      throw { status: 404, message: "Task not found" };
    }

    if (task.creatorId !== userId && task.assignedToId !== userId) {
      throw { status: 403, message: "Forbidden" };
    }

    const updatedTask = await taskRepo.update(taskId, data);

    // 🔔 REASSIGNMENT NOTIFICATION
    if (
      data.assignedToId &&
      data.assignedToId !== task.assignedToId &&
      data.assignedToId !== userId
    ) {
      await notificationRepo.create(
        data.assignedToId,
        `You have been assigned a task: "${task.title}"`
      );

      emitNotification(data.assignedToId);
    }

    // 🔔 STATUS CHANGE NOTIFICATION
    if (data.status && data.status !== task.status) {
      const notifyUserId =
        task.creatorId === userId
          ? task.assignedToId
          : task.creatorId;

      if (notifyUserId) {
        await notificationRepo.create(
          notifyUserId,
          `Task "${task.title}" status changed to ${data.status}`
        );

        emitNotification(notifyUserId);
      }
    }

    // 🔥 REAL-TIME TASK UPDATE
    emitTaskUpdated(taskId, updatedTask);

    return updatedTask;
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await taskRepo.findById(taskId);
    if (!task) {
      throw { status: 404, message: "Task not found" };
    }

    if (task.creatorId !== userId) {
      throw { status: 403, message: "Only creator can delete task" };
    }

    await taskRepo.delete(taskId);
  }

  async listTasks() {
    return taskRepo.findAll();
  }

async getDashboardTasks(
  userId: string,
  query: {
    view?: "assigned" | "created" | "overdue";
    status?: TaskStatus;
    priority?: TaskPriority;
    sortBy?: "dueDate";
    order?: "asc" | "desc";
  }
) {
  const where: any = {};
  const orderBy: any = {};

  // Views
  if (query.view === "assigned") {
    where.assignedToId = userId;
  }

  if (query.view === "created") {
    where.creatorId = userId;
  }

  if (query.view === "overdue") {
    where.dueDate = { lt: new Date() };
    where.status = { not: "COMPLETED" };
  }

  // Filters
  if (query.status) {
    where.status = query.status;
  }

  if (query.priority) {
    where.priority = query.priority;
  }

  // ✅ Sorting
  if (query.sortBy === "dueDate") {
    orderBy.dueDate = query.order === "desc" ? "desc" : "asc";
  }

  return taskRepo.findDashboardTasks(where, orderBy);
}



  async getById(taskId: string, userId: string) {
    const task = await taskRepo.findById(taskId);

    if (!task) {
      throw { status: 404, message: "Task not found" };
    }

    if (
      task.creatorId !== userId &&
      task.assignedToId !== userId
    ) {
      throw { status: 403, message: "Forbidden" };
    }

    return task;
  }
}
