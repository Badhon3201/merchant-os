import type { Request, Response } from "express";
import permissionService from "./permission.service";
import { successResponse, errorResponse } from "../../shared/utils/response";

class PermissionController {
  async getPermissions(req: Request, res: Response) {
    try {
      const permissions = await permissionService.getPermissions();

      return successResponse(res, "Permissions retrieved successfully", permissions, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to fetch permissions", 400);
    }
  }

  async seedDefaults(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const permissions = await permissionService.seedDefaultsForCompany(companyId);

      return successResponse(res, "Default permissions seeded successfully", permissions, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to seed permissions", 400);
    }
  }
}

export default new PermissionController();
