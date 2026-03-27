interface Env {
  LIKES: KVNamespace;
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

  const val = await env.LIKES.get(slug);
  return Response.json({ count: Number(val ?? 0) });
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

  const body = await request.json<{ unlike?: boolean }>();
  const current = Number(await env.LIKES.get(slug) ?? 0);
  const next = body.unlike ? Math.max(0, current - 1) : current + 1;

  await env.LIKES.put(slug, String(next));
  return Response.json({ count: next });
};
