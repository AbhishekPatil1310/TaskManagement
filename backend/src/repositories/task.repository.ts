import { prisma } from "../config/prisma";
import { CreateTaskInput, UpdateTaskInput } from "../dtos/task.dto";
import { Prisma } from "@prisma/client";
import type { Task } from "@prisma/client";

export class TaskRepository {
  // ✅ All methods now use singleton prisma
  async create(data: CreateTaskInput & { creatorId: string }): Promise<Task> {
    return prisma.task.create({ data });
  }

  async findById(id: string): Promise<Task | null> {
    return prisma.task.findUnique({ where: { id } });
  }

  async update(id: string, data: UpdateTaskInput): Promise<Task> {
    return prisma.task.update({
      where: { id },
      data
    });
  }

  async delete(id: string): Promise<Task> {
    return prisma.task.delete({ where: { id } });
  }

  async findAll(): Promise<Task[]> {
    return prisma.task.findMany({
      orderBy: { dueDate: "asc" }
    });
  }

  async findDashboardTasks(where: any, orderBy?: any): Promise<Task[]> {
    return prisma.task.findMany({
      where,
      orderBy: orderBy || undefined
    });
  }
}
