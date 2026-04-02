// Minimal Cloudflare binding types — avoids importing @cloudflare/workers-types
// globally which conflicts with Next.js DOM types.

interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

interface Ai {
  run(model: string, params: Record<string, unknown>): Promise<unknown>;
}

interface CloudflareEnv {
  [key: string]: unknown;
  LIKES: KVNamespace;
  AI: Ai;
  QDRANT_URL: string;
  QDRANT_API_KEY: string;
}
