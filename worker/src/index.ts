import type { Env } from "./types";
import { corsHeaders, error, json } from "./cors";
import { handleCategories, handleCategory } from "./routes/categories";
import { handleProducts, handleProduct } from "./routes/products";
import { handleUpload } from "./routes/upload";
import { handleSettings } from "./routes/settings";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = env.CORS_ORIGIN ?? "*";

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(origin) });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");
    const segments = path.split("/").filter(Boolean);

    // Routes: /api/categories, /api/categories/:id
    //         /api/products,   /api/products/:id
    //         /api/upload

    if (segments[0] !== "api") return error("Not found", 404);

    try {
      if (segments[1] === "categories") {
        if (segments[2]) return handleCategory(request, env, segments[2]);
        return handleCategories(request, env);
      }

      if (segments[1] === "products") {
        if (segments[2]) return handleProduct(request, env, segments[2]);
        return handleProducts(request, env);
      }

      if (segments[1] === "upload") {
        return handleUpload(request, env);
      }

      if (segments[1] === "settings") {
        return handleSettings(request, env);
      }

      if (segments[1] === "auth") {
        const authHeader = request.headers.get("Authorization");
        if (authHeader === `Bearer ${env.ADMIN_SECRET}`) {
          return json({ ok: true }, 200, origin);
        }
        return error("Unauthorized", 401, origin);
      }

      return error("Not found", 404);
    } catch (err) {
      console.error(err);
      return error("Internal server error", 500, origin);
    }
  },
};
