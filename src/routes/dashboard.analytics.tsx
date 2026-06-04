import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard";

export const Route = createFileRoute("/dashboard/analytics")({
  head: () => ({ meta: [{ title: "Analytics — EduFlow" }] }),
  component: AnalyticsDashboard,
});
