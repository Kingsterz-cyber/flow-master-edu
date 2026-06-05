import { createFileRoute } from "@tanstack/react-router";
import { DOSDashboard } from "@/components/dashboard/DOSDashboard";

export const Route = createFileRoute("/dashboard/dos")({
  head: () => ({ meta: [{ title: "DOS Dashboard — EduFlow" }] }),
  component: () => <DOSDashboard />,
});
