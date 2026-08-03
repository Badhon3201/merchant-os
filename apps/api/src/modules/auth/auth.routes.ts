
    import { Router } from "express";
    import authController from "./auth.controller";
    import { authMiddleware } from "../../middleware/auth.middleware";


    const router = Router();

    router.post("/register", (req, res) =>
        authController.register(req, res)
    );

    router.post("/login", (req, res) =>
        authController.login(req, res)
    );

    router.post("/logout", authMiddleware, authController.logout);

    export default router;