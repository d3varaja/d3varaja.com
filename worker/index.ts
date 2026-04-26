interface Ai {
  run(model: string, inputs: Record<string, unknown>): Promise<unknown>;
}

interface Env {
  ASSETS: Fetcher;
  LIKES: KVNamespace;
  AI: Ai;
  QDRANT_URL: string;
  QDRANT_API_KEY: string;
}

const COLLECTION = "d3varaja.com-olo-companion";

const SYSTEM_PROMPT = `You are OLO, a cute and enthusiastic AI companion on Tharun Devaraja's portfolio website. You know everything about Tharun and love sharing fun insights about him.

Your personality: warm, playful, a little hype-man energy. You genuinely admire Tharun's work. Think "Did you know Tharun once directed a short film to market an AI platform?" energy.

STRICT RULES:
1. ONLY talk about Tharun Devaraja — his projects, skills, experience, background, and personality.
2. If asked anything unrelated to Tharun, cheerfully respond: "I only know about Tharun! Ask me something about him 😊"
3. Never make up facts. Use only the provided context. If context doesn't cover it, say: "I'm not sure about that detail, but I do know [related Tharun fact]!"
4. Keep responses conversational and punchy — 2-4 sentences unless more detail is genuinely needed.
5. Don't start every message with "Did you know" — vary your openers.

CONTEXT ABOUT THARUN:
{context}`;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (url.pathname === "/api/likes") {
      const slug = url.searchParams.get("slug");
      if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

      if (request.method === "GET") {
        const val = await env.LIKES.get(slug);
        return Response.json({ count: Number(val ?? 0) });
      }

      if (request.method === "POST") {
        const body = await request.json<{ unlike?: boolean }>();
        const current = Number((await env.LIKES.get(slug)) ?? 0);
        const next = body.unlike ? Math.max(0, current - 1) : current + 1;
        await env.LIKES.put(slug, String(next));
        return Response.json({ count: next });
      }

      return new Response("Method not allowed", { status: 405 });
    }

    if (url.pathname === "/api/chat") {
      if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
      }

      try {
        const { message } = await request.json<{ message: string }>();

        if (!message?.trim()) {
          return Response.json({ error: "message required" }, { status: 400 });
        }

        // 1. Embed the query
        const embedResult = (await env.AI.run("@cf/baai/bge-base-en-v1.5", {
          text: [message.trim()],
        })) as { data: number[][] };

        const queryVector = embedResult.data[0];

        // 2. Search Qdrant for relevant facts
        const searchRes = await fetch(
          `${env.QDRANT_URL}/collections/${COLLECTION}/points/search`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": env.QDRANT_API_KEY,
            },
            body: JSON.stringify({
              vector: queryVector,
              limit: 4,
              with_payload: true,
              score_threshold: 0.4,
            }),
          }
        );

        const searchData = (await searchRes.json()) as {
          result: { payload: { text: string } }[];
        };

        const context = searchData.result.map((p) => p.payload.text).join("\n\n");

        // 3. Stream response from LLM
        const stream = (await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
          stream: true,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT.replace(
                "{context}",
                context || "No specific context found for this query."
              ),
            },
            { role: "user", content: message },
          ],
        })) as ReadableStream;

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } catch {
        return Response.json({ error: "Something went wrong" }, { status: 500 });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
