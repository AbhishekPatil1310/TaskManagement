import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { RegisterDto, LoginDto } from "../dtos/auth.dto";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const data = RegisterDto.parse(req.body);
    const { user, token } = await authService.register(data);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.status(201).json({ id: user.id, email: user.email, name: user.name });
  }

  async login(req: Request, res: Response) {
    const data = LoginDto.parse(req.body);
    const { user, token } = await authService.login(data);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({ id: user.id, email: user.email, name: user.name });
  }

  async logout(_: Request, res: Response) {
    res.clearCookie("token");
    res.status(204).send();
  }
}

