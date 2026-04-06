import fs from "fs";
import path from "path";
import matter from "gray-matter";
import manifest from "./blog-manifest.json";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
}

export interface Post extends PostMeta {
  content: string;
}

/** Return all posts sorted by date (newest first). */
export function getAllPosts(): PostMeta[] {
  return manifest as PostMeta[];
}

/** Return a single post by slug (with markdown body). */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    readTime: data.readTime ?? "",
    description: data.description ?? "",
    content,
  };
}
