import { UserRepository } from "../repositories/user.repository";
import { UpdateProfileInput } from "../dtos/user.dto";

const userRepo = new UserRepository();

export class UserService {
  async getProfile(userId: string) {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    return user;
  }

  async updateProfile(userId: string, data: UpdateProfileInput) {
    return userRepo.updateName(userId, data.name);
  }

    async listUsers(currentUserId: string) {
    // exclude self if you want
    return userRepo.findAllExcept(currentUserId);
  }
}
