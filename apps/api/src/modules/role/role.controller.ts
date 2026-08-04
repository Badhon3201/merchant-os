import type { Request, Response } from "express";
import roleService from "./role.service";
import { successResponse, errorResponse } from "../../shared/utils/response";

class RoleController {
  async getRoles(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const roles = await roleService.getRoles(companyId);

      return successResponse(res, "Roles retrieved successfully", roles, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to fetch roles", 400);
    }
  }

  async createRole(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const { name } = req.body;

      const role = await roleService.createRole(companyId, name);

      return successResponse(res, "Role created successfully", role, 201);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to create role", 400);
    }
  }

  async updateRole(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const roleId = Number(req.params.id);
      const { name } = req.body;

      const role = await roleService.updateRole(companyId, roleId, { name });

      return successResponse(res, "Role updated successfully", role, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to update role", 400);
    }
  }

  async deleteRole(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const roleId = Number(req.params.id);

      const role = await roleService.deleteRole(companyId, roleId);

      return successResponse(res, "Role deleted successfully", role, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to delete role", 400);
    }
  }

  async getPermissions(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const permissions = await roleService.getPermissions(companyId);

      return successResponse(res, "Permissions retrieved successfully", permissions, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to fetch permissions", 400);
    }
  }

  async assignPermissions(req: Request, res: Response) {
    try {
      const companyId = (req as any).user.companyId;
      const roleId = Number(req.params.id);
      const { permissionIds } = req.body;

      const permissions = await roleService.assignPermissions(companyId, roleId, permissionIds ?? []);

      return successResponse(res, "Role permissions updated successfully", permissions, 200);
    } catch (error: any) {
      return errorResponse(res, error.message ?? "Unable to assign permissions", 400);
    }
  }
}

export default new RoleController();
