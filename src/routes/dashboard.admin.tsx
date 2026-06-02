import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/dashboard/AdminDashboard";

export const Route = createFileRoute("/dashboard/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — EduFlow" }] }),
  component: AdminDashboard,
});
