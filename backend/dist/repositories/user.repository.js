"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../config/prisma");
class UserRepository {
    findByEmail(email) {
        return prisma_1.prisma.user.findUnique({ where: { email } });
    }
    findById(id) {
        return prisma_1.prisma.user.findUnique({ where: { id } });
    }
    create(data) {
        return prisma_1.prisma.user.create({ data });
    }
    updateName(id, name) {
        return prisma_1.prisma.user.update({
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
    findAllExcept(userId) {
        return prisma_1.prisma.user.findMany({
            where: { id: { not: userId } },
            select: {
                id: true,
                name: true,
                email: true
            }
        });
    }
}
exports.UserRepository = UserRepository;
