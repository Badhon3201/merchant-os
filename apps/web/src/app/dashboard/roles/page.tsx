"use client";

import { useMemo, useState } from "react";
import { useAssignPermissions, useCreateRole, useDeleteRole, usePermissions, useRoles, useUpdateRole } from "@/hooks/use-roles";
import Button from "@/component/ui/button";
import Input from "@/component/ui/input";
import { CheckCircle2, Plus, ShieldCheck, Trash2 } from "lucide-react";

export default function RolesPage() {
  const { data, isLoading } = useRoles();
  const { data: permissionsData, isLoading: permissionsLoading } = usePermissions();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const deleteRole = useDeleteRole();
  const assignPermissions = useAssignPermissions();

  const [roleName, setRoleName] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const roles = useMemo(() => data?.data ?? [], [data]);
  const permissions = useMemo(() => permissionsData?.data ?? [], [permissionsData]);

  const handleCreate = () => {
    if (!roleName.trim()) return;
    createRole.mutate(roleName.trim(), {
      onSuccess: () => setRoleName(""),
    });
  };

  const handleRoleSelect = (role: any) => {
    setSelectedRoleId(role.id);
    setSelectedPermissions(role.permissions?.map((item: any) => item.permission.id) ?? []);
  };

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions((current) =>
      current.includes(permissionId)
        ? current.filter((item) => item !== permissionId)
        : [...current, permissionId]
    );
  };

  const handleAssign = () => {
    if (!selectedRoleId) return;
    assignPermissions.mutate({ id: selectedRoleId, permissionIds: selectedPermissions });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Role & Permission Center</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">Manage teams and access</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Create roles, assign permissions, and keep your company operations secure.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input label="New role" placeholder="e.g. Sales Manager" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
              <Button className="flex items-center gap-2" onClick={handleCreate} disabled={createRole.isPending}>
                <Plus className="h-4 w-4" />
                Add role
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Available roles</h2>
                <p className="text-sm text-slate-500">Select a role to update permissions.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {isLoading ? (
                <p className="text-sm text-slate-500">Loading roles...</p>
              ) : (
                roles.map((role: any) => (
                  <div key={role.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                    <button className="flex-1 text-left" onClick={() => handleRoleSelect(role)}>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                        <span className="font-semibold text-slate-800">{role.name}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{role.permissions?.length ?? 0} permissions assigned</p>
                    </button>
                    <button onClick={() => deleteRole.mutate(role.id)} className="rounded-full p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Permissions</h2>
              <p className="text-sm text-slate-500">Toggle access controls for the selected role.</p>
            </div>

            {permissionsLoading ? (
              <p className="mt-6 text-sm text-slate-500">Loading permissions...</p>
            ) : (
              <div className="mt-6 space-y-3">
                {permissions.map((permission: any) => (
                  <label key={permission.id} className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50/60">
                    <div>
                      <p className="font-medium text-slate-800">{permission.name}</p>
                      <p className="text-sm text-slate-500">{permission.resource}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600"
                    />
                  </label>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={handleAssign} disabled={!selectedRoleId || assignPermissions.isPending}>
                Save permissions
              </Button>
              <Button variant="outline" onClick={() => { setSelectedRoleId(null); setSelectedPermissions([]); }}>
                Clear selection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
