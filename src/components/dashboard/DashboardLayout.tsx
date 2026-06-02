import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type Role = "admin" | "teacher" | "student";

export function DashboardLayout({ role, children }: { role: Role; children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-surface/40">
      <Sidebar role={role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar role={role} />
        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6">{children}</main>
      </div>
    </div>
  );
}
