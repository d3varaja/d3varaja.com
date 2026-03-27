interface Env {
  ASSETS: Fetcher;
  LIKES: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/likes") {
      const slug = url.searchParams.get("slug");
      if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

      if (request.method === "GET") {
        const val = await env.LIKES.get(slug);
        return Response.json({ count: Number(val ?? 0) });
      }

      if (request.method === "POST") {
        const body = await request.json<{ unlike?: boolean }>();
        const current = Number(await env.LIKES.get(slug) ?? 0);
        const next = body.unlike ? Math.max(0, current - 1) : current + 1;
        await env.LIKES.put(slug, String(next));
        return Response.json({ count: next });
      }

      return new Response("Method not allowed", { status: 405 });
    }

    return env.ASSETS.fetch(request);
  },
};
