import Image from "next/image";
import Link from "next/link";

import { formatPrice, getStockStatus, type Product } from "@/lib/catalog";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const [image] = product.images;
  const soldOut = getStockStatus(product.stock) === "sold-out";

  return (
    <Link href={`/products/${product.slug}`} className={`group block ${className ?? ""}`}>
      <div className="media-frame aspect-product">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 64rem) 25vw, (min-width: 48rem) 33vw, 50vw"
        />
        {product.isNew && !soldOut && (
          <span className="eyebrow absolute top-3 left-3 text-ink">New</span>
        )}
      </div>
      <div className="flex flex-col gap-1 pt-3 pr-2">
        <h3 className="text-body-sm">{product.name}</h3>
        <p className="text-body-sm text-ink-muted">
          {soldOut ? "Sold out" : formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
