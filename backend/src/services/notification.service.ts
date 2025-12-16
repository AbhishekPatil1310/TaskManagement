import { NotificationRepository } from "../repositories/notification.repository";

const repo = new NotificationRepository();

export class NotificationService {
  create(userId: string, message: string) {
    return repo.create(userId, message);
  }



  markAsRead(notificationId: string) {
    return repo.markAsRead(notificationId);
  }
}
