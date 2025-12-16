"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
const repo = new notification_repository_1.NotificationRepository();
class NotificationService {
    create(userId, message) {
        return repo.create(userId, message);
    }
    markAsRead(notificationId) {
        return repo.markAsRead(notificationId);
    }
}
exports.NotificationService = NotificationService;
