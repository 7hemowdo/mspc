import type { Env } from "../types";
import { json, error } from "../cors";
import { requireAuth } from "../auth";

export async function handleCategories(request: Request, env: Env): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  if (request.method === "GET") {
    const { results } = await env.DB.prepare(
      "SELECT * FROM categories ORDER BY sort_order ASC, name ASC"
    ).all();
    return json(results, 200, origin);
  }

  const authError = requireAuth(request, env);
  if (authError) return authError;

  if (request.method === "POST") {
    const body = await request.json() as {
      name: string;
      slug: string;
      description: string;
      image_url?: string;
      sort_order?: number;
      featured?: number;
    };

    if (!body.name || !body.slug) return error("name and slug are required");

    const result = await env.DB.prepare(
      `INSERT INTO categories (name, slug, description, image_url, sort_order, featured)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(
        body.name,
        body.slug,
        body.description ?? "",
        body.image_url ?? "",
        body.sort_order ?? 0,
        body.featured ?? 0
      )
      .run();

    return json({ id: result.meta.last_row_id }, 201, origin);
  }

  return error("Method not allowed", 405);
}

export async function handleCategory(
  request: Request,
  env: Env,
  id: string
): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  if (request.method === "GET") {
    const row = await env.DB.prepare("SELECT * FROM categories WHERE id = ?")
      .bind(id)
      .first();
    if (!row) return error("Category not found", 404);
    return json(row, 200, origin);
  }

  const authError = requireAuth(request, env);
  if (authError) return authError;

  if (request.method === "PUT") {
    const body = await request.json() as Partial<{
      name: string;
      slug: string;
      description: string;
      image_url: string;
      sort_order: number;
      featured: number;
    }>;

    await env.DB.prepare(
      `UPDATE categories
       SET name = COALESCE(?, name),
           slug = COALESCE(?, slug),
           description = COALESCE(?, description),
           image_url = COALESCE(?, image_url),
           sort_order = COALESCE(?, sort_order),
           featured = COALESCE(?, featured)
       WHERE id = ?`
    )
      .bind(
        body.name ?? null,
        body.slug ?? null,
        body.description ?? null,
        body.image_url ?? null,
        body.sort_order ?? null,
        body.featured ?? null,
        id
      )
      .run();

    return json({ success: true }, 200, origin);
  }

  if (request.method === "DELETE") {
    await env.DB.prepare("DELETE FROM categories WHERE id = ?").bind(id).run();
    return json({ success: true }, 200, origin);
  }

  return error("Method not allowed", 405);
}
