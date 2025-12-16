import { prisma } from "../config/prisma";

export class UserRepository {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  }

  updateName(id: string, name: string) {
    return prisma.user.update({
      where: { id },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

    findAllExcept(userId: string) {
    return prisma.user.findMany({
      where: { id: { not: userId } },
      select: {
        id: true,
        name: true,
        email: true
      }
    });
  }
}



