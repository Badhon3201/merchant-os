"use client";

import Link from "next/link";
import { ReactNode } from "react";

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLink: string;
  footerHref: string;
};

export default function AuthShell({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerHref,
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_38%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col overflow-hidden rounded-[32px] border border-slate-200 bg-white/90 shadow-[0_25px_70px_-25px_rgba(15,23,42,0.4)] backdrop-blur lg:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 p-8 text-white sm:p-10">
          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-blue-100">
              MerchantOS
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Run your retail operations with clarity.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
              Manage login access, roles, and permissions from one polished experience.
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-5 shadow-inner">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
              Why teams love it
            </p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>• Fast onboarding for new users</li>
              <li>• Clear role-based access control</li>
              <li>• Beautiful, responsive interface</li>
            </ul>
          </div>
        </div>

        <div className="flex-1 p-6 sm:p-8 lg:p-10">
          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-5 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
          </div>

          {children}

          <div className="mt-6 text-center text-sm text-slate-500">
            {footerText}{" "}
            <Link href={footerHref} className="font-semibold text-blue-600 transition hover:text-blue-700">
              {footerLink}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
