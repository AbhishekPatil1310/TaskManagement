import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UpdateProfileDto } from "../dtos/user.dto";

const userService = new UserService();

export class UserController {
  async getMe(req: Request, res: Response) {
    const userId = req.user!.id;
    const profile = await userService.getProfile(userId);
    res.json(profile);
  }

  async updateMe(req: Request, res: Response) {
    console.log('the body from frontend is: ', req.body)
    const userId = req.user!.id;
    const data = UpdateProfileDto.parse(req.body);
    const updated = await userService.updateProfile(userId, data);
    res.json(updated);
  }


    async list(req: Request, res: Response) {
    const users = await userService.listUsers(req.user!.id);
    res.json(users);
  }

}
