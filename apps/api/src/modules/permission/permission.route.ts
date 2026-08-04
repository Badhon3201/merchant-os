import { Router } from "express";
import permissionController from "./permission.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", permissionController.getPermissions);
router.post("/seed-defaults", permissionController.seedDefaults);

export default router;
