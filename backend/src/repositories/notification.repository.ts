import { prisma } from "../config/prisma";

export class NotificationRepository {
  create(userId: string, message: string) {
    return prisma.notification.create({
      data: {
        userId,
        message
      }
    });
  }

  findUnread(userId: string) {
    return prisma.notification.findMany({
      where: { userId, read: false },
      orderBy: { createdAt: "desc" }
    });
  }

  findAll(userId: string) {
    return prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  markAsRead(id: string) {
    return prisma.notification.update({
      where: { id },
      data: { read: true }
    });
  }
}
