import { getStockStatus, type StockStatus } from "@/lib/catalog";

const LABELS: Record<StockStatus, (stock: number) => string> = {
  "in-stock": () => "In stock",
  "low-stock": (stock) => `Only ${stock} left`,
  "sold-out": () => "Sold out",
};

const DOT_COLORS: Record<StockStatus, string> = {
  "in-stock": "bg-success",
  "low-stock": "bg-warning",
  "sold-out": "bg-ink-muted",
};

export function StockStatusLabel({
  stock,
  className = "",
}: {
  stock: number;
  className?: string;
}) {
  const status = getStockStatus(stock);

  return (
    <p className={`inline-flex items-center gap-2 text-body-sm ${className}`}>
      <span aria-hidden="true" className={`size-1.5 rounded-full ${DOT_COLORS[status]}`} />
      {LABELS[status](stock)}
    </p>
  );
}
