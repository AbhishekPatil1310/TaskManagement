import { Request, Response } from "express";
import { NotificationRepository } from "../repositories/notification.repository";

const repo = new NotificationRepository();

export class NotificationController {
  async list(req: Request, res: Response) {
    const userId = req.user!.id;
    const notifications = await repo.findAll(userId);
    res.json(notifications);
  }

  async unread(req: Request, res: Response) {
    const userId = req.user!.id;
    const notifications = await repo.findUnread(userId);
    res.json(notifications);
  }

  async markRead(req: Request, res: Response) {
    const { id } = req.params;
    await repo.markAsRead(id);
    res.json({ success: true });
  }
}
