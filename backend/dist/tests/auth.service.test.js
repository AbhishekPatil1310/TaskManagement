"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../task.service");
const task_repository_1 = require("../../repositories/task.repository");
jest.mock("../../repositories/task.repository");
describe("TaskService.updateTask authorization", () => {
    const service = new task_service_1.TaskService();
    const repo = jest.mocked(new task_repository_1.TaskRepository());
    beforeEach(() => {
        repo.findById.mockResolvedValue({
            id: "task-1",
            title: "Task",
            creatorId: "creator-id",
            assignedToId: "assignee-id",
            status: "TODO",
            priority: "MEDIUM"
        });
    });
    it("throws 403 if user is neither creator nor assignee", async () => {
        await expect(service.updateTask("task-1", "random-user", {
            status: "IN_PROGRESS"
        })).rejects.toMatchObject({
            status: 403
        });
    });
});
