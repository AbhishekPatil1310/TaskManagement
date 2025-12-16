"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const notification_repository_1 = require("../repositories/notification.repository");
const repo = new notification_repository_1.NotificationRepository();
class NotificationController {
    async list(req, res) {
        const userId = req.user.id;
        const notifications = await repo.findAll(userId);
        res.json(notifications);
    }
    async unread(req, res) {
        const userId = req.user.id;
        const notifications = await repo.findUnread(userId);
        res.json(notifications);
    }
    async markRead(req, res) {
        const { id } = req.params;
        await repo.markAsRead(id);
        res.json({ success: true });
    }
}
exports.NotificationController = NotificationController;
