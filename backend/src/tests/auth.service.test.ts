import { TaskService } from "../task.service";
import { TaskRepository } from "../../repositories/task.repository";

jest.mock("../../repositories/task.repository");

describe("TaskService.updateTask authorization", () => {
  const service = new TaskService();
  const repo = jest.mocked(new TaskRepository());

  beforeEach(() => {
    (repo.findById as jest.Mock).mockResolvedValue({
      id: "task-1",
      title: "Task",
      creatorId: "creator-id",
      assignedToId: "assignee-id",
      status: "TODO",
      priority: "MEDIUM"
    });
  });

  it("throws 403 if user is neither creator nor assignee", async () => {
    await expect(
      service.updateTask("task-1", "random-user", {
        status: "IN_PROGRESS"
      })
    ).rejects.toMatchObject({
      status: 403
    });
  });
});
