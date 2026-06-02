import { createFileRoute } from "@tanstack/react-router";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";

export const Route = createFileRoute("/dashboard/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — EduFlow" }] }),
  component: StudentDashboard,
});
