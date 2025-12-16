"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const prisma_1 = require("../config/prisma");
class TaskRepository {
    create(data) {
        return prisma_1.prisma.task.create({ data });
    }
    findById(id) {
        return prisma_1.prisma.task.findUnique({ where: { id } });
    }
    update(id, data) {
        return prisma_1.prisma.task.update({
            where: { id },
            data
        });
    }
    delete(id) {
        return prisma_1.prisma.task.delete({ where: { id } });
    }
    findAll() {
        return prisma_1.prisma.task.findMany({
            orderBy: { dueDate: "asc" }
        });
    }
    findDashboardTasks(where, orderBy) {
        return prisma_1.prisma.task.findMany({
            where,
            orderBy: orderBy ? orderBy : undefined
        });
    }
}
exports.TaskRepository = TaskRepository;
