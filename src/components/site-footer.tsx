import Link from "next/link";

const columns = [
  {
    title: "Client Services",
    links: ["Contact us", "Shipping", "Returns", "Care guide"],
  },
  {
    title: "The House",
    links: ["Our atelier", "Craftsmanship", "Sustainability", "Careers"],
  },
  {
    title: "Legal",
    links: ["Terms of sale", "Privacy", "Cookie settings", "Accessibility"],
  },
];

export function SiteFooter() {
  return (
    <footer className="theme-inverse bg-canvas">
      <div className="page-container section-y">
        <div className="page-grid gap-y-10">
          {columns.map((column) => (
            <div key={column.title} className="col-span-6 md:col-span-4 lg:col-span-3">
              <h2 className="eyebrow mb-4">{column.title}</h2>
              <ul className="flex flex-col gap-3">
                {column.links.map((label) => (
                  <li key={label}>
                    <Link href="#" className="link-draw text-body">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-12 lg:col-span-3">
            <h2 className="eyebrow mb-4">Newsletter</h2>
            <p className="mb-5 text-body text-ink-muted">
              Collection launches, private events and stories from the atelier.
            </p>
            <Link href="#" className="btn btn-secondary w-full md:w-auto">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="page-container overflow-hidden">
        <p
          aria-hidden="true"
          className="font-display text-[24.5vw] leading-[0.8] tracking-[-0.04em] uppercase xl:text-[22rem]"
        >
          Atelier
        </p>
      </div>

      <div className="page-container">
        <div className="divider flex flex-col gap-2 py-6 text-body-sm text-ink-muted md:flex-row md:justify-between">
          <p>© 2026 Atelier. Sample storefront.</p>
          <p>United States · English</p>
        </div>
      </div>
    </footer>
  );
}
