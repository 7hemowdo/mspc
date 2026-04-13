export interface Env {
  DB: D1Database;
  CLOUDINARY_CLOUD_NAME: string;
  CLOUDINARY_API_KEY: string;
  CLOUDINARY_API_SECRET: string;
  CORS_ORIGIN: string;
  ADMIN_SECRET: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  sort_order: number;
  featured: number;
}

export interface Product {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  short_description: string;
  full_description: string;
  image_url: string;
  status: "available" | "out-of-stock" | "hidden";
  is_featured: number;
  is_new_arrival: number;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface ProductSpec {
  id: number;
  product_id: number;
  label: string;
  value: string;
  sort_order: number;
}
