import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";

const taskService = new TaskService();

export class TaskController {
  async create(req: Request, res: Response) {
    const data = CreateTaskDto.parse(req.body);
    const task = await taskService.createTask(req.user!.id, data);
    res.status(201).json(task);
  }

    async getById(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user!.id;

    const task = await taskService.getById(id, userId);

    res.json(task);
  }

  async update(req: Request, res: Response) {
    const data = UpdateTaskDto.parse(req.body);
    console.log("the update task data: ",data)
    const task = await taskService.updateTask(
      req.params.id,
      req.user!.id,
      data
    );
    res.json(task);
  }

  async remove(req: Request, res: Response) {
    await taskService.deleteTask(req.params.id, req.user!.id);
    res.status(204).send();
  }

  async list(_: Request, res: Response) {
    const tasks = await taskService.listTasks();
    res.json(tasks);
  }

async dashboard(req: Request, res: Response) {
  const tasks = await taskService.getDashboardTasks(req.user!.id, {
    view: req.query.view as any,
    status: req.query.status as any,
    priority: req.query.priority as any,
    sortBy: req.query.sortBy as "dueDate" | undefined,
    order: req.query.order as "asc" | "desc" | undefined
  });

  res.json(tasks);
}


}

