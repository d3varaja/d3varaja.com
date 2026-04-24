import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

  const val = await env.LIKES.get(slug);
  return Response.json({ count: Number(val ?? 0) });
}

export async function POST(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) return Response.json({ error: "missing slug" }, { status: 400 });

  const body = (await request.json()) as { unlike?: boolean };
  const current = Number((await env.LIKES.get(slug)) ?? 0);
  const next = body.unlike ? Math.max(0, current - 1) : current + 1;
  await env.LIKES.put(slug, String(next));
  return Response.json({ count: next });
}
