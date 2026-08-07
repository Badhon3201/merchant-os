import api from "@/lib/axios";

export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const createRole = async (name: string) => {
  const response = await api.post("/roles", { name });
  return response.data;
};

export const updateRole = async ({ id, name }: { id: number; name: string }) => {
  const response = await api.patch(`/roles/${id}`, { name });
  return response.data;
};

export const deleteRole = async (id: number) => {
  const response = await api.delete(`/roles/${id}`);
  return response.data;
};

export const getPermissions = async () => {
  const response = await api.get("/roles/permissions");
  return response.data;
};

export const assignPermissions = async ({ id, permissionIds }: { id: number; permissionIds: number[] }) => {
  const response = await api.post(`/roles/${id}/permissions`, { permissionIds });
  return response.data;
};
