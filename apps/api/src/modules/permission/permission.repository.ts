import prisma from "../../database/prisma";

class PermissionRepository {
  async findAll() {
    return prisma.permission.findMany({
      orderBy: { name: "asc" },
    });
  }

  async findByIds(permissionIds: number[]) {
    return prisma.permission.findMany({
      where: {
        id: {
          in: permissionIds,
        },
      },
    });
  }

  async ensureDefaults(permissionNames: readonly string[]) {
    const existingPermissions = await prisma.permission.findMany({
      where: {
        name: {
          in: [...permissionNames],
        },
      },
    });

    const existingNames = new Set(existingPermissions.map((permission) => permission.name));

    const missingPermissions = permissionNames.filter((name) => !existingNames.has(name));

    for (const permissionName of missingPermissions) {
      const [resource, action] = permissionName.split(".");

      await prisma.permission.create({
        data: {
          name: permissionName,
          resource: resource ?? permissionName,
          action: action ?? "view",
        },
      });
    }

    return this.findAll();
  }

  async setRolePermissions(roleId: number, permissionIds: number[]) {
    await prisma.$transaction(async (tx) => {
      await tx.rolePermission.deleteMany({
        where: { roleId },
      });

      if (permissionIds.length === 0) {
        return;
      }

      await tx.rolePermission.createMany({
        data: permissionIds.map((permissionId) => ({
          roleId,
          permissionId,
        })),
      });
    });

    return this.getRolePermissions(roleId);
  }

  async getRolePermissions(roleId: number) {
    return prisma.rolePermission.findMany({
      where: { roleId },
      include: {
        permission: true,
      },
    });
  }
}

export default new PermissionRepository();
