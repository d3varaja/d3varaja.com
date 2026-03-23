import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  description: string;
}

export interface Post extends PostMeta {
  content: string; // raw markdown body
}

/** Return all posts sorted by date (newest first). */
export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        readTime: data.readTime ?? "",
        description: data.description ?? "",
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
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
