"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const userRepo = new user_repository_1.UserRepository();
class AuthService {
    async register(data) {
        const existing = await userRepo.findByEmail(data.email);
        if (existing) {
            throw { status: 400, message: "Email already registered" };
        }
        const hashed = await (0, password_1.hashPassword)(data.password);
        const user = await userRepo.create({
            name: data.name,
            email: data.email,
            password: hashed
        });
        const token = (0, jwt_1.signToken)(user.id);
        return { user, token };
    }
    async login(data) {
        const user = await userRepo.findByEmail(data.email);
        if (!user) {
            throw { status: 401, message: "Invalid credentials" };
        }
        const valid = await (0, password_1.comparePassword)(data.password, user.password);
        if (!valid) {
            throw { status: 401, message: "Invalid credentials" };
        }
        const token = (0, jwt_1.signToken)(user.id);
        return { user, token };
    }
}
exports.AuthService = AuthService;
