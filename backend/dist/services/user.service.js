"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const userRepo = new user_repository_1.UserRepository();
class UserService {
    async getProfile(userId) {
        const user = await userRepo.findById(userId);
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
        return user;
    }
    async updateProfile(userId, data) {
        return userRepo.updateName(userId, data.name);
    }
    async listUsers(currentUserId) {
        // exclude self if you want
        return userRepo.findAllExcept(currentUserId);
    }
}
exports.UserService = UserService;
