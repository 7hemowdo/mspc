import type { Env } from "../types";
import { json, error } from "../cors";
import { requireAuth } from "../auth";
import { uploadImage } from "../cloudinary";

export async function handleUpload(request: Request, env: Env): Promise<Response> {
  const origin = env.CORS_ORIGIN;

  const authError = requireAuth(request, env);
  if (authError) return authError;

  if (request.method !== "POST") return error("Method not allowed", 405);

  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) return error("No file provided");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return error("Invalid file type. Allowed: JPEG, PNG, WebP, GIF");
  }

  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) return error("File too large. Maximum size is 10MB");

  const url = await uploadImage(
    file,
    env.CLOUDINARY_CLOUD_NAME,
    env.CLOUDINARY_API_KEY,
    env.CLOUDINARY_API_SECRET
  );

  return json({ url }, 200, origin);
}
