"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const task_repository_1 = require("../repositories/task.repository");
const notification_repository_1 = require("../repositories/notification.repository");
const prisma_1 = require("../config/prisma");
const socket_1 = require("../socket");
const taskRepo = new task_repository_1.TaskRepository();
const notificationRepo = new notification_repository_1.NotificationRepository();
class TaskService {
    async createTask(userId, data) {
        if (data.assignedToId) {
            const user = await prisma_1.prisma.user.findUnique({
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
            await notificationRepo.create(data.assignedToId, `You have been assigned a task: "${task.title}"`);
            // 🔥 REAL-TIME PUSH
            (0, socket_1.emitNotification)(data.assignedToId);
        }
        return task;
    }
    async updateTask(taskId, userId, data) {
        const task = await taskRepo.findById(taskId);
        if (!task) {
            throw { status: 404, message: "Task not found" };
        }
        if (task.creatorId !== userId && task.assignedToId !== userId) {
            throw { status: 403, message: "Forbidden" };
        }
        const updatedTask = await taskRepo.update(taskId, data);
        // 🔔 REASSIGNMENT NOTIFICATION
        if (data.assignedToId &&
            data.assignedToId !== task.assignedToId &&
            data.assignedToId !== userId) {
            await notificationRepo.create(data.assignedToId, `You have been assigned a task: "${task.title}"`);
            (0, socket_1.emitNotification)(data.assignedToId);
        }
        // 🔔 STATUS CHANGE NOTIFICATION
        if (data.status && data.status !== task.status) {
            const notifyUserId = task.creatorId === userId
                ? task.assignedToId
                : task.creatorId;
            if (notifyUserId) {
                await notificationRepo.create(notifyUserId, `Task "${task.title}" status changed to ${data.status}`);
                (0, socket_1.emitNotification)(notifyUserId);
            }
        }
        // 🔥 REAL-TIME TASK UPDATE
        (0, socket_1.emitTaskUpdated)(taskId, updatedTask);
        return updatedTask;
    }
    async deleteTask(taskId, userId) {
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
    async getDashboardTasks(userId, query) {
        const where = {};
        const orderBy = {};
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
    async getById(taskId, userId) {
        const task = await taskRepo.findById(taskId);
        if (!task) {
            throw { status: 404, message: "Task not found" };
        }
        if (task.creatorId !== userId &&
            task.assignedToId !== userId) {
            throw { status: 403, message: "Forbidden" };
        }
        return task;
    }
}
exports.TaskService = TaskService;
