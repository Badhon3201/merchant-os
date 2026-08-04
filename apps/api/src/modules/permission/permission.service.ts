import { DEFAULT_PERMISSIONS, DEFAULT_ROLE_PERMISSIONS } from "./permission.constants";
import permissionRepository from "./permission.repository";
import roleRepository from "../role/role.repository";

class PermissionService {
  async getPermissions() {
    return permissionRepository.findAll();
  }

  async seedDefaultsForCompany(companyId: number) {
    const permissions = await permissionRepository.ensureDefaults(DEFAULT_PERMISSIONS);
    const permissionMap = new Map(permissions.map((permission) => [permission.name, permission.id]));

    const roleNames = Object.keys(DEFAULT_ROLE_PERMISSIONS);

    for (const roleName of roleNames) {
      let role = await roleRepository.findByName(companyId, roleName);

      if (!role) {
        role = await roleRepository.create(companyId, roleName);
      }

      const assignedPermissionIds = (DEFAULT_ROLE_PERMISSIONS[roleName] ?? [])
        .map((permissionName) => permissionMap.get(permissionName))
        .filter((permissionId): permissionId is number => typeof permissionId === "number");

      await roleRepository.setPermissions(role.id, assignedPermissionIds);
    }

    return permissions;
  }
}

export default new PermissionService();
