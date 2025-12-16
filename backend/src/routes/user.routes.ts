import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new UserController();

router.get("/me", authMiddleware, controller.getMe);
router.put("/me", authMiddleware, controller.updateMe);
router.get("/", authMiddleware, controller.list);

export default router;
