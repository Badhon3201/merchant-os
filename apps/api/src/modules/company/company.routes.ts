
    import { Router } from "express";
    import companyController from "./company.controller";
    import { authMiddleware } from "../../middleware/auth.middleware";

    const router = Router();


    router.get( "/companies", authMiddleware, companyController.getCompany);

    router.put("/update", authMiddleware, companyController.updateCompany);

    export default router;