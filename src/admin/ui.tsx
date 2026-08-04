"use client";

import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useAdmin } from "./store";
import { can, type Action, type Resource } from "@/data/users";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-semibold uppercase tracking-tight text-white">
          {title}
        </h1>
        {description && <p className="mt-1.5 text-sm text-white/50">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/** Toont de inhoud alleen als de aangemelde rol daar recht op heeft. */
export function RequirePermission({
  resource,
  action = "view",
  message,
  children,
}: {
  resource: Resource;
  action?: Action;
  message: string;
  children: ReactNode;
}) {
  const { user } = useAdmin();
  if (!user) return null;

  if (!can(user.role, resource, action)) {
    return (
      <div className="card flex items-start gap-3 p-6">
        <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rangers-red" aria-hidden="true" />
        <p className="text-sm text-white/60">{message}</p>
      </div>
    );
  }

  return <>{children}</>;
}

export function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="card p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/40">{label}</p>
      <p className="mt-2 font-display text-3xl font-bold text-white">{value}</p>
      {hint && <p className="mt-1 text-xs text-white/35">{hint}</p>}
    </div>
  );
}

export function DataTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[40rem] border-collapse text-sm">
          <thead>
            <tr className="border-b border-rangers-border text-left text-[11px] uppercase tracking-wider text-white/40">
              {headers.map((header) => (
                <th key={header} scope="col" className="px-4 py-3 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </div>
  );
}

export const statusStyles: Record<string, string> = {
  published: "bg-emerald-500/15 text-emerald-400",
  review: "bg-amber-500/15 text-amber-400",
  draft: "bg-white/10 text-white/50",
};
