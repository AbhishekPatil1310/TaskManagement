"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_service_1 = require("../services/task.service");
const task_dto_1 = require("../dtos/task.dto");
const taskService = new task_service_1.TaskService();
class TaskController {
    async create(req, res) {
        const data = task_dto_1.CreateTaskDto.parse(req.body);
        const task = await taskService.createTask(req.user.id, data);
        res.status(201).json(task);
    }
    async getById(req, res) {
        const { id } = req.params;
        const userId = req.user.id;
        const task = await taskService.getById(id, userId);
        res.json(task);
    }
    async update(req, res) {
        const data = task_dto_1.UpdateTaskDto.parse(req.body);
        const task = await taskService.updateTask(req.params.id, req.user.id, data);
        res.json(task);
    }
    async remove(req, res) {
        await taskService.deleteTask(req.params.id, req.user.id);
        res.status(204).send();
    }
    async list(_, res) {
        const tasks = await taskService.listTasks();
        res.json(tasks);
    }
    async dashboard(req, res) {
        const tasks = await taskService.getDashboardTasks(req.user.id, {
            view: req.query.view,
            status: req.query.status,
            priority: req.query.priority,
            sortBy: req.query.sortBy,
            order: req.query.order
        });
        res.json(tasks);
    }
}
exports.TaskController = TaskController;
