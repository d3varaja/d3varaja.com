import type { Metadata } from "next";
import ProjectsListClient from "./ProjectsListClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected work by Tharun Devaraja — case studies, shipped products, and the small things in between.",
  openGraph: {
    title: "Projects — Tharun Devaraja",
    description:
      "Case studies, shipped products, and the small things in between.",
  },
};

export default function ProjectsPage() {
  return <ProjectsListClient />;
}
