import manifest from "./blog-manifest.json";

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
  return (manifest as Post[]).map(({ slug, title, date, readTime, description }) => ({
    slug, title, date, readTime, description,
  }));
}

/** Return a single post by slug (with markdown body). */
export function getPostBySlug(slug: string): Post | null {
  return (manifest as Post[]).find((p) => p.slug === slug) ?? null;
}
