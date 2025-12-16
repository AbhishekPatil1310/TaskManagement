"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const prisma_1 = require("../config/prisma");
class TaskRepository {
    // ✅ All methods now use singleton prisma
    async create(data) {
        return prisma_1.prisma.task.create({ data });
    }
    async findById(id) {
        return prisma_1.prisma.task.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma_1.prisma.task.update({
            where: { id },
            data
        });
    }
    async delete(id) {
        return prisma_1.prisma.task.delete({ where: { id } });
    }
    async findAll() {
        return prisma_1.prisma.task.findMany({
            orderBy: { dueDate: "asc" }
        });
    }
    async findDashboardTasks(where, orderBy) {
        return prisma_1.prisma.task.findMany({
            where,
            orderBy: orderBy || undefined
        });
    }
}
exports.TaskRepository = TaskRepository;
