import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "content", "blog");

// Parse frontmatter without gray-matter (keep script dependency-free)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { data: {}, content: raw };
  const data = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    data[key] = val;
  }
  const content = raw.slice(match[0].length).trim();
  return { data, content };
}

const posts = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const slug = f.replace(/\.md$/, "");
    const raw = readFileSync(join(postsDir, f), "utf-8");
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      readTime: data.readTime ?? "",
      description: data.description ?? "",
      content,
    };
  })
  .sort((a, b) => (a.date > b.date ? -1 : 1));

// Write as a static JSON import — bundled into the Worker at build time
writeFileSync(
  join(root, "src", "lib", "blog-manifest.json"),
  JSON.stringify(posts, null, 2)
);

console.log(`Blog manifest generated: ${posts.map((p) => p.slug).join(", ")}`);
