"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const prisma_1 = require("../config/prisma");
class NotificationRepository {
    create(userId, message) {
        return prisma_1.prisma.notification.create({
            data: {
                userId,
                message
            }
        });
    }
    findUnread(userId) {
        return prisma_1.prisma.notification.findMany({
            where: { userId, read: false },
            orderBy: { createdAt: "desc" }
        });
    }
    findAll(userId) {
        return prisma_1.prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        });
    }
    markAsRead(id) {
        return prisma_1.prisma.notification.update({
            where: { id },
            data: { read: true }
        });
    }
}
exports.NotificationRepository = NotificationRepository;
