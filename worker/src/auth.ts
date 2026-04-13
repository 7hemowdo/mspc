import { error } from "./cors";

export function requireAuth(
  request: Request,
  env: { ADMIN_SECRET: string },
  origin = "*"
): Response | null {
  const auth = request.headers.get("Authorization");
  if (!auth || auth !== `Bearer ${env.ADMIN_SECRET}`) {
    return error("Unauthorized", 401, origin);
  }
  return null;
}
