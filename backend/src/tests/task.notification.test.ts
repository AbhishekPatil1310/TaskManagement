import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repositories/task.repository";
import { NotificationRepository } from "../repositories/notification.repository";

jest.mock("../../repositories/task.repository");
jest.mock("../../repositories/notification.repository");

describe("TaskService.updateTask notifications", () => {
  const service = new TaskService();
  const taskRepo = jest.mocked(new TaskRepository());
  const notificationRepo = jest.mocked(new NotificationRepository());

  beforeEach(() => {
    taskRepo.findById.mockResolvedValue({
      id: "task-1",
      title: "Important Task",
      creatorId: "creator-id",
      assignedToId: "old-user",
      status: "TODO",
      priority: "HIGH"
    });

    taskRepo.update.mockResolvedValue({} as any);
  });

  it("creates notification when task is reassigned", async () => {
    await service.updateTask("task-1", "creator-id", {
      assignedToId: "new-user"
    });

    expect(notificationRepo.create).toHaveBeenCalledWith(
      "new-user",
      expect.stringContaining("assigned")
    );
  });
});
