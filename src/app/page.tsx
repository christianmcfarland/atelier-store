import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import {
  collections,
  editorial,
  hero,
  services,
  stories,
} from "@/lib/catalog";
import { getNewArrivals } from "@/lib/products";

export default async function Home() {
  const newArrivals = await getNewArrivals();

  return (
    <main className="flex-1">
      {/* Campaign hero: full-bleed image, copy anchored to the bottom. */}
      <section className="theme-inverse relative h-[100svh] min-h-[36rem] bg-canvas media-scrim">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/35 to-transparent" />
        <div className="page-container absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-6 pb-14 text-center lg:pb-20">
          <p className="eyebrow text-ink">{hero.eyebrow}</p>
          <h1 className="font-display text-display-md uppercase lg:text-display-lg">
            {hero.title}
          </h1>
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
            <Link href="#new-arrivals" className="btn btn-primary">
              Shop the collection
            </Link>
            <Link href="#collections" className="btn btn-glass">
              Discover the campaign
            </Link>
          </div>
        </div>
      </section>

      {/* New arrivals: product-first listing. */}
      <section id="new-arrivals" className="section-y">
        <div className="page-container">
          <SectionHeading eyebrow="Just in" title="New Arrivals" href="#" />
          <div className="product-grid">
            {newArrivals.map((product, index) => (
              <ProductCard
                key={product.slug}
                product={product}
                className={index >= 6 ? "md:max-lg:hidden" : undefined}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured collections: swipeable rail on small screens, three-up on md+. */}
      <section id="collections" className="pb-section">
        <div className="page-container">
          <SectionHeading eyebrow="Featured" title="The Collections" />
          <ul className="bleed scrollbar-none flex snap-x snap-mandatory scroll-px-gutter gap-1 overflow-x-auto px-gutter md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 lg:gap-2">
            {collections.map((collection) => (
              <li key={collection.slug} className="w-[82%] shrink-0 snap-start md:w-auto">
                <Link
                  href="#"
                  className="theme-inverse media-frame media-scrim group block aspect-portrait"
                >
                  <Image
                    src={collection.image.src}
                    alt={collection.image.alt}
                    fill
                    sizes="(min-width: 48rem) 33vw, 82vw"
                    className="object-[50%_20%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2 p-5 lg:p-8">
                    <p className="eyebrow text-ink">{collection.eyebrow}</p>
                    <h3 className="text-title-lg uppercase">{collection.title}</h3>
                    <span className="link-draw self-start text-title-xs uppercase">
                      Discover
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Editorial split: large image beside a short story. */}
      <section className="bg-canvas-subtle section-y">
        <div className="page-container page-grid items-center gap-y-10">
          <div className="media-frame col-span-12 aspect-portrait md:col-span-7 lg:col-span-5 lg:col-start-2 lg:aspect-product">
            <Image
              src={editorial.image.src}
              alt={editorial.image.alt}
              fill
              sizes="(min-width: 64rem) 40vw, (min-width: 48rem) 55vw, 100vw"
              className="object-[50%_20%]"
            />
          </div>
          <div className="col-span-12 flex flex-col items-start gap-6 md:col-span-5 md:pl-6 lg:col-span-4 lg:col-start-8 lg:pl-0">
            <p className="eyebrow">{editorial.eyebrow}</p>
            <h2 className="font-display text-title-2xl uppercase">{editorial.title}</h2>
            <p className="max-w-sm text-body-lg text-ink-muted">{editorial.body}</p>
            <Link href="#" className="btn btn-primary">
              Shop evening
            </Link>
          </div>
        </div>
      </section>

      {/* Story diptych: two full-height images edge to edge. */}
      <section className="grid gap-1 md:grid-cols-2">
        {stories.map((story) => (
          <Link
            key={story.slug}
            href="#"
            className="theme-inverse media-frame media-scrim group block aspect-portrait md:aspect-product"
          >
            <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 48rem) 50vw, 100vw" />
            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 p-8 text-center lg:p-12">
              <p className="eyebrow text-ink">{story.eyebrow}</p>
              <h2 className="font-display text-title-xl uppercase">{story.title}</h2>
              <span className="mt-2 inline-flex items-center gap-2 text-title-xs uppercase">
                Read the story <ArrowIcon width={16} height={16} />
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* Client services. */}
      <section className="page-container section-y">
        <ul className="grid gap-px bg-line md:grid-cols-3">
          {services.map((service) => (
            <li key={service.title} className="flex flex-col gap-2 bg-canvas py-8 md:px-8 md:first:pl-0">
              <h2 className="text-title-xs uppercase">{service.title}</h2>
              <p className="text-body text-ink-muted">{service.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
