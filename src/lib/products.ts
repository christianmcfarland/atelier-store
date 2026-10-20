// Product queries for the storefront. Server-only: this is the one module in
// `src/lib` that imports the database. Results are cached and tagged
// "products", so a later stock or catalog edit can call updateTag("products").

import { asc, desc, eq, ne, sql } from "drizzle-orm";
import { cacheLife, cacheTag } from "next/cache";

import { db } from "@/db";
import { products } from "@/db/schema";
import type { Product } from "@/lib/catalog";

const withRelations = {
  category: true,
  images: { orderBy: (image, { asc }) => [asc(image.position)] },
} as const satisfies NonNullable<Parameters<typeof db.query.products.findMany>[0]>["with"];

type ProductRow = NonNullable<
  Awaited<ReturnType<typeof db.query.products.findFirst<{ with: typeof withRelations }>>>
>;

// Newest first; ties (one seed insert) fall back to insertion order.
const defaultOrder = [desc(products.createdAt), asc(products.id)];

function toProduct(row: ProductRow): Product {
  return {
    slug: row.slug,
    name: row.name,
    category: row.category.name,
    price: row.priceCents,
    stock: row.stockQuantity,
    isNew: row.isNew,
    description: row.description,
    details: row.details,
    images: row.images.map(({ src, alt }) => ({ src, alt })),
  };
}

export async function getProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await db.select({ slug: products.slug }).from(products).orderBy(...defaultOrder);
  return rows.map((row) => row.slug);
}

export async function getNewArrivals(limit = 8): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const rows = await db.query.products.findMany({
    with: withRelations,
    orderBy: defaultOrder,
    limit,
  });
  return rows.map(toProduct);
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product:${slug}`);

  const row = await db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: withRelations,
  });
  return row && toProduct(row);
}

/** Same-category pieces first, then the rest of the catalog. */
export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  const sameCategory = sql`${products.categoryId} = (select "category_id" from "products" where "slug" = ${slug})`;
  const rows = await db.query.products.findMany({
    where: ne(products.slug, slug),
    with: withRelations,
    orderBy: [desc(sameCategory), ...defaultOrder],
    limit,
  });
  return rows.map(toProduct);
}
