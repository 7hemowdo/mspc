const WORKER_URL = "https://mspc-api.abdouceesay007.workers.dev";
const TOKEN_KEY = "mspc_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/admin/login/";
}

export function requireAuth() {
  if (!getToken()) {
    window.location.href = "/admin/login/";
    return false;
  }
  return true;
}

export async function api(path, options = {}) {
  const { body, method = "GET", multipart = false } = options;

  const headers = { Authorization: `Bearer ${getToken()}` };
  if (!multipart) headers["Content-Type"] = "application/json";

  const res = await fetch(`${WORKER_URL}${path}`, {
    method,
    headers,
    body: multipart ? body : body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    clearToken();
    return null;
  }

  return res;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  const duration = type === "error" ? 5000 : 3000;
  requestAnimationFrame(() => toast.classList.add("toast--visible"));
  setTimeout(() => {
    toast.classList.remove("toast--visible");
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

export function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str ?? ""));
  return div.innerHTML;
}

export function validateImageFile(file) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return "Invalid file type. Allowed: JPEG, PNG, WebP, GIF";
  }
  if (file.size > 10 * 1024 * 1024) {
    return "File too large. Maximum size is 10MB";
  }
  return null;
}

export function setLoading(button, loading) {
  if (loading) {
    button.dataset.originalText = button.textContent;
    button.textContent = "Saving…";
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText ?? "Save";
    button.disabled = false;
  }
}
