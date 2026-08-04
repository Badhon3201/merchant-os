import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().trim().min(2, "Role name must be at least 2 characters").max(100),
});

export const updateRoleSchema = z.object({
  name: z.string().trim().min(2, "Role name must be at least 2 characters").max(100).optional(),
});

export const assignPermissionsSchema = z.object({
  permissionIds: z.array(z.number().int().positive()).default([]),
});
