import { prisma } from "../config/prisma";
import { CreateTaskInput, UpdateTaskInput } from "../dtos/task.dto";
import { Prisma } from "@prisma/client";


export class TaskRepository {
  create(data: CreateTaskInput & { creatorId: string }) {
    return prisma.task.create({ data });
  }

  findById(id: string) {
    return prisma.task.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateTaskInput) {
    return prisma.task.update({
      where: { id },
      data
    });
  }

  delete(id: string) {
    return prisma.task.delete({ where: { id } });
  }

  findAll() {
    return prisma.task.findMany({
      orderBy: { dueDate: "asc" }
    });
  }

findDashboardTasks(where: any, orderBy?: any) {
  return prisma.task.findMany({
    where,
    orderBy: orderBy ? orderBy : undefined
  });
}

}
