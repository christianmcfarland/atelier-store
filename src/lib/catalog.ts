// Shared catalog types and helpers, plus static editorial content. Product
// data lives in the database: query it through `src/lib/products.ts`. Keep this
// file free of database imports; client components import from it.

export type CatalogImage = {
  src: string;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** Price in cents. */
  price: number;
  /** Units available. 0 is sold out. */
  stock: number;
  isNew?: boolean;
  description: string;
  details: string[];
  /** The first image is the primary listing image. */
  images: CatalogImage[];
};

export type Collection = {
  slug: string;
  eyebrow: string;
  title: string;
  image: CatalogImage;
};

export type StockStatus = "in-stock" | "low-stock" | "sold-out";

const LOW_STOCK_THRESHOLD = 3;

export function unsplash(id: string): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;
}

// Close-up cut from the same photo: fp-x/fp-y pick the focal point, fp-z the zoom.
export function unsplashDetail(id: string, x: number, y: number, zoom: number): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1800&h=2400&q=80&crop=focalpoint&fp-x=${x}&fp-y=${y}&fp-z=${zoom}`;
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getStockStatus(stock: number): StockStatus {
  if (stock <= 0) return "sold-out";
  if (stock <= LOW_STOCK_THRESHOLD) return "low-stock";
  return "in-stock";
}

export const hero = {
  eyebrow: "Autumn–Winter 2026",
  title: "The Quiet Season",
  image: {
    src: unsplash("1581044777550-4cfa60707c03"),
    alt: "Woman in a pale ruffled dress standing in a golden autumn field",
  },
};

export const collections: Collection[] = [
  {
    slug: "women",
    eyebrow: "Women",
    title: "Outerwear",
    image: {
      src: unsplash("1483985988355-763728e1935b"),
      alt: "Woman in a burgundy wool coat and dark sunglasses carrying shopping bags",
    },
  },
  {
    slug: "men",
    eyebrow: "Men",
    title: "Soft Tailoring",
    image: {
      src: unsplash("1552374196-1ab2a1c593e8"),
      alt: "Man in a camel blazer and cream trousers seated on a wooden stool",
    },
  },
  {
    slug: "jewelry",
    eyebrow: "Jewelry",
    title: "Gold Studies",
    image: {
      src: unsplash("1617038220319-276d3cfab638"),
      alt: "Sculptural gold earrings on a stone under soft directional light",
    },
  },
];

export const editorial = {
  eyebrow: "The Evening Edit",
  title: "Cut for the long night",
  body: "Column gowns in double-faced crepe, finished by hand in our atelier. Each piece is fitted to move with the body and fall cleanly to the floor.",
  image: {
    src: unsplash("1612336307429-8a898d10e223"),
    alt: "Woman in a floor-length red gown against a pale grey backdrop",
  },
};

export const stories = [
  {
    slug: "tailoring",
    eyebrow: "Atelier Notes",
    title: "The Tailoring Room",
    image: {
      src: unsplash("1507679799987-c73779587ccf"),
      alt: "Close view of a man buttoning a navy suit jacket over a striped tie",
    },
  },
  {
    slug: "resort",
    eyebrow: "Resort 2027",
    title: "A Coastal Garden",
    image: {
      src: unsplash("1496747611176-843222e1e57c"),
      alt: "Floral silk dress caught in the wind against a blue seaside sky",
    },
  },
] satisfies Collection[];

export const services = [
  {
    title: "Complimentary shipping",
    body: "Free express delivery and returns on every order.",
  },
  {
    title: "Book an appointment",
    body: "Private styling, in store or by video, at a time that suits you.",
  },
  {
    title: "Signature packaging",
    body: "Every order arrives wrapped and ready to give.",
  },
];

export const navigation = [
  { label: "New In", href: "#new-arrivals" },
  { label: "Women", href: "#collections" },
  { label: "Men", href: "#collections" },
  { label: "Bags", href: "#new-arrivals" },
  { label: "Jewelry", href: "#collections" },
];
