import { UserRepository } from "../repositories/user.repository";
import { RegisterInput, LoginInput } from "../dtos/auth.dto";
import { hashPassword, comparePassword } from "../utils/password";
import { signToken } from "../utils/jwt";

const userRepo = new UserRepository();

export class AuthService {
  async register(data: RegisterInput) {
    const existing = await userRepo.findByEmail(data.email);
    if (existing) {
      throw { status: 400, message: "Email already registered" };
    }

    const hashed = await hashPassword(data.password);

    const user = await userRepo.create({
      name: data.name,
      email: data.email,
      password: hashed
    });

    const token = signToken(user.id);

    return { user, token };
  }

  async login(data: LoginInput) {
    const user = await userRepo.findByEmail(data.email);
    if (!user) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const valid = await comparePassword(data.password, user.password);
    if (!valid) {
      throw { status: 401, message: "Invalid credentials" };
    }

    const token = signToken(user.id);
    return { user, token };
  }
}
