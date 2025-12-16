import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();
const controller = new TaskController();

router.use(authMiddleware);

router.post("/", controller.create);
// router.get("/", controller.list);
router.get("/dashboard", controller.dashboard);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.get("/:id", controller.getById);



export default router;
