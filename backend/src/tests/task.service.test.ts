import { TaskService } from "../services/task.service";
import { prisma } from "../config/prisma";

jest.mock("../../config/prisma", () => ({
  prisma: {
    user: {
      findUnique: jest.fn()
    }
  }
}));

describe("TaskService.createTask", () => {
  const service = new TaskService();

  it("throws 400 if assigned user does not exist", async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(
      service.createTask("creator-id", {
        title: "Test task",
        dueDate: new Date().toISOString(),
        priority: "MEDIUM",
        status: "TODO",
        assignedToId: "invalid-user"
      })
    ).rejects.toMatchObject({
      status: 400
    });
  });
});
