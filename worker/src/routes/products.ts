import type { Env } from "../types";
import { json, error } from "../cors";
import { requireAuth } from "../auth";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function handleProducts(request: Request, env: Env): Promise<Response> {
  const origin = env.CORS_ORIGIN;
  const url = new URL(request.url);

  if (request.method === "GET") {
    const category = url.searchParams.get("category");
    const status = url.searchParams.get("status");
    const featured = url.searchParams.get("featured");
    const newArrival = url.searchParams.get("new_arrival");

    let query = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params: unknown[] = [];

    if (category) { query += " AND c.slug = ?"; params.push(category); }
    if (status) { query += " AND p.status = ?"; params.push(status); }
    if (featured === "1") { query += " AND p.is_featured = 1"; }
    if (newArrival === "1") { query += " AND p.is_new_arrival = 1"; }

    query += " ORDER BY p.created_at DESC";

    const { results } = await env.DB.prepare(query).bind(...params).all();

    for (const product of results as Record<string, unknown>[]) {
      const { results: specs } = await env.DB.prepare(
        "SELECT label, value FROM product_specs WHERE product_id = ? ORDER BY sort_order ASC"
      )
        .bind(product.id)
        .all();
      product.specs = specs;
    }

    return json(results, 200, origin);
  }

  const authError = requireAuth(request, env, origin);
  if (authError) return authError;

  if (request.method === "POST") {
    const body = await request.json() as {
      category_id: number;
      name: string;
      slug?: string;
      short_description?: string;
      full_description?: string;
      image_url?: string;
      status?: string;
      is_featured?: number;
      is_new_arrival?: number;
      is_published?: number;
      specs?: { label: string; value: string }[];
    };

    if (!body.name || !body.category_id) {
      return error("name and category_id are required", 400, origin);
    }

    const validStatuses = ["available", "out-of-stock", "hidden"];
    if (body.status && !validStatuses.includes(body.status)) {
      return error("Invalid status value", 400, origin);
    }

    const slug = body.slug || slugify(body.name);

    const result = await env.DB.prepare(
      `INSERT INTO products
        (category_id, name, slug, short_description, full_description,
         image_url, status, is_featured, is_new_arrival, is_published)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        body.category_id,
        body.name,
        slug,
        body.short_description ?? "",
        body.full_description ?? "",
        body.image_url ?? "",
        body.status ?? "available",
        body.is_featured ?? 0,
        body.is_new_arrival ?? 0,
        body.is_published ?? 1
      )
      .run();

    const productId = result.meta.last_row_id;

    if (body.specs?.length) {
      for (let i = 0; i < body.specs.length; i++) {
        await env.DB.prepare(
          "INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (?, ?, ?, ?)"
        )
          .bind(productId, body.specs[i].label, body.specs[i].value, i)
          .run();
      }
    }

    return json({ id: productId, slug }, 201, origin);
  }

  return error("Method not allowed", 405);
}

export async function handleProduct(
  request: Request,
  env: Env,
  id: string
): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  if (request.method === "GET") {
    const product = await env.DB.prepare(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = ? OR p.slug = ?`
    )
      .bind(id, id)
      .first();

    if (!product) return error("Product not found", 404, origin);

    const { results: specs } = await env.DB.prepare(
      "SELECT label, value FROM product_specs WHERE product_id = ? ORDER BY sort_order ASC"
    )
      .bind((product as Record<string, unknown>).id)
      .all();

    return json({ ...product, specs }, 200, origin);
  }

  const authError = requireAuth(request, env, origin);
  if (authError) return authError;

  if (request.method === "PUT") {
    const body = await request.json() as Partial<{
      category_id: number;
      name: string;
      slug: string;
      short_description: string;
      full_description: string;
      image_url: string;
      status: string;
      is_featured: number;
      is_new_arrival: number;
      is_published: number;
      specs: { label: string; value: string }[];
    }>;

    const validStatuses = ["available", "out-of-stock", "hidden"];
    if (body.status && !validStatuses.includes(body.status)) {
      return error("Invalid status value", 400, origin);
    }

    await env.DB.prepare(
      `UPDATE products
       SET category_id = COALESCE(?, category_id),
           name = COALESCE(?, name),
           slug = COALESCE(?, slug),
           short_description = COALESCE(?, short_description),
           full_description = COALESCE(?, full_description),
           image_url = COALESCE(?, image_url),
           status = COALESCE(?, status),
           is_featured = COALESCE(?, is_featured),
           is_new_arrival = COALESCE(?, is_new_arrival),
           is_published = COALESCE(?, is_published),
           updated_at = datetime('now')
       WHERE id = ?`
    )
      .bind(
        body.category_id ?? null,
        body.name ?? null,
        body.slug ?? null,
        body.short_description ?? null,
        body.full_description ?? null,
        body.image_url ?? null,
        body.status ?? null,
        body.is_featured ?? null,
        body.is_new_arrival ?? null,
        body.is_published ?? null,
        id
      )
      .run();

    if (body.specs) {
      await env.DB.prepare("DELETE FROM product_specs WHERE product_id = ?").bind(id).run();
      for (let i = 0; i < body.specs.length; i++) {
        await env.DB.prepare(
          "INSERT INTO product_specs (product_id, label, value, sort_order) VALUES (?, ?, ?, ?)"
        )
          .bind(id, body.specs[i].label, body.specs[i].value, i)
          .run();
      }
    }

    return json({ success: true }, 200, origin);
  }

  if (request.method === "DELETE") {
    await env.DB.prepare("DELETE FROM products WHERE id = ?").bind(id).run();
    return json({ success: true }, 200, origin);
  }

  return error("Method not allowed", 405);
}
