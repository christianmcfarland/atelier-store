// Loads the launch catalog. Idempotent: rows are upserted by slug (and images
// by product + position), so it is safe to re-run.
// Run with `npm run db:seed` after `npm run db:migrate`.

import { config } from "dotenv";
import { sql } from "drizzle-orm";

config({ path: [".env.local", ".env"], quiet: true });

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  // Imported after dotenv: src/db/index.ts throws if DATABASE_URL is unset.
  const { db } = await import("./index");
  const { categories, productImages, products } = await import("./schema");
  const { seedProducts } = await import("./seed-data");

  const categoryNames = [...new Set(seedProducts.map((product) => product.category))];
  const categoryRows = await db
    .insert(categories)
    .values(categoryNames.map((name) => ({ slug: slugify(name), name })))
    .onConflictDoUpdate({ target: categories.slug, set: { name: sql`excluded.name` } })
    .returning({ id: categories.id, name: categories.name });
  const categoryIds = new Map(categoryRows.map((row) => [row.name, row.id]));

  const productRows = await db
    .insert(products)
    .values(
      seedProducts.map((product) => ({
        slug: product.slug,
        name: product.name,
        description: product.description,
        details: product.details,
        priceCents: product.price,
        stockQuantity: product.stock,
        isNew: product.isNew ?? false,
        categoryId: categoryIds.get(product.category)!,
      })),
    )
    .onConflictDoUpdate({
      target: products.slug,
      set: {
        name: sql`excluded.name`,
        description: sql`excluded.description`,
        details: sql`excluded.details`,
        priceCents: sql`excluded.price_cents`,
        stockQuantity: sql`excluded.stock_quantity`,
        isNew: sql`excluded.is_new`,
        categoryId: sql`excluded.category_id`,
        updatedAt: sql`now()`,
      },
    })
    .returning({ id: products.id, slug: products.slug });
  const productIds = new Map(productRows.map((row) => [row.slug, row.id]));

  await db
    .insert(productImages)
    .values(
      seedProducts.flatMap((product) =>
        product.images.map((image, position) => ({
          productId: productIds.get(product.slug)!,
          src: image.src,
          alt: image.alt,
          position,
        })),
      ),
    )
    .onConflictDoUpdate({
      target: [productImages.productId, productImages.position],
      set: { src: sql`excluded.src`, alt: sql`excluded.alt` },
    });

  console.log(
    `Seeded ${categoryRows.length} categories, ${productRows.length} products and their images.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
