"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const user_dto_1 = require("../dtos/user.dto");
const userService = new user_service_1.UserService();
class UserController {
    async getMe(req, res) {
        const userId = req.user.id;
        const profile = await userService.getProfile(userId);
        res.json(profile);
    }
    async updateMe(req, res) {
        const userId = req.user.id;
        const data = user_dto_1.UpdateProfileDto.parse(req.body);
        console.log("the update task data: ", data);
        const updated = await userService.updateProfile(userId, data);
        res.json(updated);
    }
    async list(req, res) {
        const users = await userService.listUsers(req.user.id);
        res.json(users);
    }
}
exports.UserController = UserController;
