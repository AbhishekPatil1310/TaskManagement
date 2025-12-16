"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskDto = exports.CreateTaskDto = void 0;
const zod_1 = require("zod");
exports.CreateTaskDto = zod_1.z.object({
    title: zod_1.z.string().max(100),
    description: zod_1.z.string(),
    dueDate: zod_1.z.string().datetime(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
    assignedToId: zod_1.z.string().uuid().optional()
});
exports.UpdateTaskDto = zod_1.z.object({
    title: zod_1.z.string().max(100).optional(),
    description: zod_1.z.string().optional(),
    dueDate: zod_1.z.string().datetime().optional(),
    priority: zod_1.z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
    status: zod_1.z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),
    assignedToId: zod_1.z.string().uuid().nullable().optional()
});
