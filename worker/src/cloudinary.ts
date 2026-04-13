export async function uploadImage(
  file: File,
  cloudName: string,
  apiKey: string,
  apiSecret: string
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "mspc-products";

  const signaturePayload = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
  const signature = await sha1(signaturePayload);

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", apiKey);
  form.append("timestamp", String(timestamp));
  form.append("folder", folder);
  form.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: form }
  );

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudinary upload failed: ${body}`);
  }

  const data = await res.json() as { secure_url: string };
  return data.secure_url;
}

async function sha1(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
