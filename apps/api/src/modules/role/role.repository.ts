import prisma from "../../database/prisma";
import type { Prisma } from "../../../generated/prisma/client";

class RoleRepository {
  async findAll(companyId: number) {
    return prisma.role.findMany({
      where: { companyId },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(companyId: number, roleId: number) {
    return prisma.role.findFirst({
      where: {
        id: roleId,
        companyId,
      },
      include: {
        permissions: {
          include: {
            permission: true,
          },
        },
      },
    });
  }

  async findByName(companyId: number, name: string) {
    return prisma.role.findFirst({
      where: {
        companyId,
        name,
      },
    });
  }

  async create(companyId: number, name: string) {
    return prisma.role.create({
      data: {
        companyId,
        name,
      },
    });
  }

  async update(roleId: number, data: Prisma.RoleUpdateInput) {
    return prisma.role.update({
      where: { id: roleId },
      data,
    });
  }

  async remove(roleId: number) {
    return prisma.role.delete({
      where: { id: roleId },
    });
  }

  async setPermissions(roleId: number, permissionIds: number[]) {
    await prisma.rolePermission.deleteMany({
      where: { roleId },
    });

    if (permissionIds.length === 0) {
      return [];
    }

    await prisma.rolePermission.createMany({
      data: permissionIds.map((permissionId) => ({
        roleId,
        permissionId,
      })),
    });

    return prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
  }
}

export default new RoleRepository();
