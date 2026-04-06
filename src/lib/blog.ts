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
  // Use pre-generated manifest (works in Cloudflare Workers where readdirSync fails)
  const manifestPath = path.join(POSTS_DIR, "_manifest.json");
  let slugs: string[];

  if (fs.existsSync(manifestPath)) {
    slugs = JSON.parse(fs.readFileSync(manifestPath, "utf-8")) as string[];
  } else {
    // Fallback for local dev without manifest
    if (!fs.existsSync(POSTS_DIR)) return [];
    slugs = fs
      .readdirSync(POSTS_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, ""));
  }

  return slugs
    .map((slug) => {
      const filePath = path.join(POSTS_DIR, `${slug}.md`);
      if (!fs.existsSync(filePath)) return null;
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        readTime: data.readTime ?? "",
        description: data.description ?? "",
      };
    })
    .filter(Boolean)
    .sort((a, b) => (a!.date > b!.date ? -1 : 1)) as PostMeta[];
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
