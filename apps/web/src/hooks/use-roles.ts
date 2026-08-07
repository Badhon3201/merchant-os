import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignPermissions, createRole, deleteRole, getPermissions, getRoles, updateRole } from "@/services/roles/role.api";

export function useRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });
}

export function usePermissions() {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
  });
}

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useDeleteRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
}

export function useAssignPermissions() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: assignPermissions,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["roles"] }),
  });
}
