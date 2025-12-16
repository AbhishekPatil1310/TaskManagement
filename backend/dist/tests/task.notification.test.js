"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const task_repository_1 = require("../repositories/task.repository");
const notification_repository_1 = require("../repositories/notification.repository");
jest.mock("../../repositories/task.repository");
jest.mock("../../repositories/notification.repository");
describe("TaskService.updateTask notifications", () => {
    const service = new task_service_1.TaskService();
    const taskRepo = jest.mocked(new task_repository_1.TaskRepository());
    const notificationRepo = jest.mocked(new notification_repository_1.NotificationRepository());
    beforeEach(() => {
        taskRepo.findById.mockResolvedValue({
            id: "task-1",
            title: "Important Task",
            creatorId: "creator-id",
            assignedToId: "old-user",
            status: "TODO",
            priority: "HIGH"
        });
        taskRepo.update.mockResolvedValue({});
    });
    it("creates notification when task is reassigned", async () => {
        await service.updateTask("task-1", "creator-id", {
            assignedToId: "new-user"
        });
        expect(notificationRepo.create).toHaveBeenCalledWith("new-user", expect.stringContaining("assigned"));
    });
});
