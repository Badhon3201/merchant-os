import { Router } from "express";
import roleController from "./role.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/", roleController.getRoles);
router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);
router.get("/permissions", roleController.getPermissions);
router.post("/:id/permissions", roleController.assignPermissions);

export default router;
