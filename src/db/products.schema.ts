import { relations, sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const products = pgTable(
  "products",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    /** Ordered bullet list shown under "Product details". */
    details: text("details").array().notNull().default(sql`'{}'::text[]`),
    priceCents: integer("price_cents").notNull(),
    /** Units available. 0 is sold out. */
    stockQuantity: integer("stock_quantity").notNull().default(0),
    isNew: boolean("is_new").notNull().default(false),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "restrict" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("products_category_id_idx").on(table.categoryId),
    check("products_price_cents_check", sql`${table.priceCents} >= 0`),
    check("products_stock_quantity_check", sql`${table.stockQuantity} >= 0`),
  ],
);

export const productImages = pgTable(
  "product_images",
  {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    src: text("src").notNull(),
    alt: text("alt").notNull(),
    /** 0 is the primary listing image. */
    position: smallint("position").notNull(),
  },
  (table) => [unique("product_images_product_id_position_key").on(table.productId, table.position)],
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  images: many(productImages),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));
