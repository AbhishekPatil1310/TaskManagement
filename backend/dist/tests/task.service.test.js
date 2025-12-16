"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const task_service_1 = require("../services/task.service");
const prisma_1 = require("../config/prisma");
jest.mock("../../config/prisma", () => ({
    prisma: {
        user: {
            findUnique: jest.fn()
        }
    }
}));
describe("TaskService.createTask", () => {
    const service = new task_service_1.TaskService();
    it("throws 400 if assigned user does not exist", async () => {
        prisma_1.prisma.user.findUnique.mockResolvedValue(null);
        await expect(service.createTask("creator-id", {
            title: "Test task",
            dueDate: new Date().toISOString(),
            priority: "MEDIUM",
            status: "TODO",
            assignedToId: "invalid-user"
        })).rejects.toMatchObject({
            status: 400
        });
    });
});
