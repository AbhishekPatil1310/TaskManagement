"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, _res, next) {
    const token = req.cookies?.token;
    if (!token) {
        throw { status: 401, message: "Unauthorized" };
    }
    const payload = (0, jwt_1.verifyToken)(token);
    req.user = { id: payload.userId };
    next();
}
