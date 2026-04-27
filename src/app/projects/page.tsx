import type { Metadata } from "next";
import ProjectsListClient from "./ProjectsListClient";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Tharun Devaraja — case studies, shipped products, and the small things in between.",
  openGraph: {
    title: "Work — Tharun Devaraja",
    description:
      "Case studies, shipped products, and the small things in between.",
  },
};

export default function ProjectsPage() {
  return <ProjectsListClient />;
}
