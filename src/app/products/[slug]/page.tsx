import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { DisclosureIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { StockStatusLabel } from "@/components/stock-status";
import { formatPrice, getStockStatus } from "@/lib/catalog";
import { getProduct, getProductSlugs, getRelatedProducts } from "@/lib/products";

export async function generateStaticParams() {
  return (await getProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return {};
  return { title: `${product.name} | Atelier`, description: product.description };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();

  const soldOut = getStockStatus(product.stock) === "sold-out";
  const related = await getRelatedProducts(product.slug);

  return (
    <main className="flex-1 pt-header">
      <div className="page-container page-grid pt-4 lg:pt-8">
        {/*
         * Gallery: an edge-to-edge swipe rail on small screens; on desktop the
         * hero image spans both columns with the close-ups paired beneath it.
         */}
        <ul
          aria-label="Product images"
          className="bleed scrollbar-none col-span-12 flex snap-x snap-mandatory gap-1 overflow-x-auto lg:col-span-7 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-2 lg:overflow-visible"
        >
          {product.images.map((image, index) => (
            <li
              key={image.src}
              className={`w-[88%] shrink-0 snap-start md:w-[60%] lg:w-auto ${
                index === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="media-frame aspect-product">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload={index === 0}
                  sizes={
                    index === 0
                      ? "(min-width: 64rem) 55vw, (min-width: 48rem) 60vw, 88vw"
                      : "(min-width: 64rem) 28vw, (min-width: 48rem) 60vw, 88vw"
                  }
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Purchase panel: follows the gallery on desktop. */}
        <div className="col-span-12 pt-8 md:max-w-xl lg:sticky lg:max-w-none lg:top-[calc(var(--spacing-header)+2rem)] lg:col-span-4 lg:col-start-9 lg:self-start lg:pt-0">
          <nav aria-label="Breadcrumb" className="mb-8 hidden lg:block">
            <ol className="flex gap-2 text-body-sm text-ink-muted">
              <li>
                <Link href="/" className="link-muted">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/#new-arrivals" className="link-muted">
                  New Arrivals
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-ink">
                {product.category}
              </li>
            </ol>
          </nav>

          <div className="flex items-center gap-3">
            <p className="eyebrow">{product.category}</p>
            {product.isNew && !soldOut && <p className="eyebrow text-ink">New</p>}
          </div>
          <h1 className="mt-3 text-title-lg uppercase">{product.name}</h1>
          <p className="mt-3 text-body-lg">{formatPrice(product.price)}</p>

          <StockStatusLabel stock={product.stock} className="mt-6" />

          <div className="mt-4 flex flex-col gap-2">
            <button type="button" className="btn btn-primary w-full" disabled={soldOut}>
              {soldOut ? "Sold out" : "Add to bag"}
            </button>
            <button type="button" className="btn btn-secondary w-full">
              {soldOut ? "Notify me when available" : "Book an appointment"}
            </button>
          </div>

          <p className="mt-8 text-body-lg text-ink-muted">{product.description}</p>

          <div className="mt-8 border-b border-line">
            <Disclosure title="Product details" defaultOpen>
              <ul className="flex list-disc flex-col gap-1 pl-4">
                {product.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </Disclosure>
            <Disclosure title="Delivery & returns">
              <p>
                Complimentary express delivery in 2–4 business days. Returns are free within
                30 days of delivery.
              </p>
            </Disclosure>
            <Disclosure title="Care">
              <p>
                Store in the dust bag provided, away from direct light. Have the piece cleaned
                by a specialist; our client advisors can arrange this for you.
              </p>
            </Disclosure>
          </div>
        </div>
      </div>

      <section className="section-y">
        <div className="page-container">
          <SectionHeading eyebrow="Discover" title="You May Also Like" href="/#new-arrivals" />
          <div className="product-grid">
            {related.map((item, index) => (
              <ProductCard
                key={item.slug}
                product={item}
                className={index === 3 ? "md:max-lg:hidden" : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Disclosure({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details className="group border-t border-line" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-title-xs uppercase [&::-webkit-details-marker]:hidden">
        {title}
        <DisclosureIcon width={16} height={16} />
      </summary>
      <div className="pb-5 text-body text-ink-muted">{children}</div>
    </details>
  );
}
