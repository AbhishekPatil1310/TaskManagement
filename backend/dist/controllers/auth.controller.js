"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_dto_1 = require("../dtos/auth.dto");
const authService = new auth_service_1.AuthService();
class AuthController {
    async register(req, res) {
        const data = auth_dto_1.RegisterDto.parse(req.body);
        const { user, token } = await authService.register(data);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production"
        });
        res.status(201).json({ id: user.id, email: user.email, name: user.name });
    }
    async login(req, res) {
        const data = auth_dto_1.LoginDto.parse(req.body);
        const { user, token } = await authService.login(data);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production"
        });
        res.json({ id: user.id, email: user.email, name: user.name });
    }
    async logout(_, res) {
        res.clearCookie("token");
        res.status(204).send();
    }
}
exports.AuthController = AuthController;
