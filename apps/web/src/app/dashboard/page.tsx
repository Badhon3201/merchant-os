"use client";

import Link from "next/link";
import { ArrowRight, LogOut, ShieldCheck, Sparkles, Users } from "lucide-react";
import { useLogout } from "@/hooks/use-logout";

export default function DashboardPage() {
  const { mutate, isPending } = useLogout();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_38%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-[0_25px_60px_-25px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 p-8 text-white">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">Dashboard</p>
                <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Welcome back to MerchantOS</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Manage your store, users, roles, and permissions from one polished workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/dashboard/roles" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25">
                  Manage roles
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => mutate()}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  <LogOut className="h-4 w-4" />
                  {isPending ? "Signing out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-blue-600/10 p-3 text-blue-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Access control</h2>
                  <p className="text-sm text-slate-500">Assign permissions safely for each role.</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Smart role management
                </div>
                <p className="mt-2 leading-7">
                  Keep your team aligned with secure access rules and clear ownership for every module.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-violet-50 p-3 text-violet-600">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">User onboarding</h2>
                  <p className="text-sm text-slate-500">Invite and manage new team members.</p>
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">• Secure sign-in and sign-out flow</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">• Clear permission overview for admins</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">• Fast navigation between workspace modules</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
