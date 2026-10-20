import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  href,
}: {
  eyebrow: string;
  title: string;
  href?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4 lg:mb-12">
      <div className="flex flex-col gap-2">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="text-title-xl uppercase">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="link-draw shrink-0 text-title-xs uppercase">
          View all
        </Link>
      )}
    </div>
  );
}
