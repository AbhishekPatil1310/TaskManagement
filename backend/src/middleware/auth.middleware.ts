import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token;
  if (!token) {
    throw { status: 401, message: "Unauthorized" };
  }

  const payload = verifyToken(token);
  req.user = { id: payload.userId };
  next();
}
