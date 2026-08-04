import { z } from "zod";

export const permissionSeedSchema = z.object({
  companyId: z.number().int().positive().optional(),
});
