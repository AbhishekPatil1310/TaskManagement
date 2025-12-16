import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { NotificationController } from "../controllers/notification.controller";

const router = Router();
const controller = new NotificationController();

router.use(authMiddleware);

router.get("/", controller.list);
router.get("/unread", controller.unread);
router.put("/:id/read", controller.markRead);

export default router;
