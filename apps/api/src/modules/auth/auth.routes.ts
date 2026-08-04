
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
    router.get( "/me", authMiddleware, authController.me);

    router.post("/logout", authMiddleware, authController.logout);

    export default router;