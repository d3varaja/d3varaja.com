import { readdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const postsDir = join(root, "content", "blog");

const slugs = readdirSync(postsDir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => f.replace(/\.md$/, ""));

writeFileSync(join(postsDir, "_manifest.json"), JSON.stringify(slugs));
console.log(`Blog manifest generated: ${slugs.join(", ")}`);
