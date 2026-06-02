import { createFileRoute } from "@tanstack/react-router";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";

export const Route = createFileRoute("/dashboard/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — EduFlow" }] }),
  component: TeacherDashboard,
});
