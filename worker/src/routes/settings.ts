import type { Env } from "../types";
import { json, error } from "../cors";
import { requireAuth } from "../auth";

export async function handleSettings(request: Request, env: Env): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  if (request.method === "GET") {
    const { results } = await env.DB.prepare("SELECT key, value FROM settings").all();
    return json(results, 200, origin);
  }

  const authError = requireAuth(request, env, origin);
  if (authError) return authError;

  if (request.method === "POST") {
    const items = await request.json() as { key: string; value: string }[];
    if (!Array.isArray(items)) return error("Expected array of {key, value}", 400, origin);

    for (const { key, value } of items) {
      await env.DB.prepare(
        "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      )
        .bind(key, value)
        .run();
    }

    return json({ success: true }, 200, origin);
  }

  return error("Method not allowed", 405);
}
