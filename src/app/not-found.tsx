import Link from "next/link";

export default function NotFound() {
  return (
    <main className="narrow-container flex flex-1 flex-col items-center justify-center gap-6 pt-[calc(var(--spacing-header)+var(--spacing-section))] pb-section text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-display text-title-2xl uppercase">Page not found</h1>
      <p className="text-body-lg text-ink-muted">
        The piece you are looking for may have moved or is no longer available.
      </p>
      <Link href="/" className="btn btn-primary">
        Return home
      </Link>
    </main>
  );
}
