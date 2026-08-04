import type { Prisma } from "../../../generated/prisma/client";
import roleRepository from "./role.repository";
import permissionRepository from "../permission/permission.repository";

class RoleService {
  async getRoles(companyId: number) {
    return roleRepository.findAll(companyId);
  }

  async createRole(companyId: number, name: string) {
    const existingRole = await roleRepository.findByName(companyId, name);

    if (existingRole) {
      throw new Error("Role already exists");
    }

    return roleRepository.create(companyId, name);
  }

  async updateRole(companyId: number, roleId: number, data: { name?: string }) {
    const role = await roleRepository.findById(companyId, roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    const updateData: Prisma.RoleUpdateInput = {};

    if (data.name !== undefined) {
      const duplicate = await roleRepository.findByName(companyId, data.name);

      if (duplicate && duplicate.id !== roleId) {
        throw new Error("Role name already in use");
      }

      updateData.name = data.name;
    }

    return roleRepository.update(roleId, updateData);
  }

  async deleteRole(companyId: number, roleId: number) {
    const role = await roleRepository.findById(companyId, roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    return roleRepository.remove(roleId);
  }

  async getPermissions(companyId: number) {
    return permissionRepository.findAll();
  }

  async assignPermissions(companyId: number, roleId: number, permissionIds: number[]) {
    const role = await roleRepository.findById(companyId, roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    return roleRepository.setPermissions(roleId, permissionIds);
  }
}

export default new RoleService();
