// The launch catalog, loaded into the database by `npm run db:seed`.

import { type Product, unsplash, unsplashDetail } from "../lib/catalog";

export const seedProducts: Product[] = [
  {
    slug: "chevron-shoulder-bag",
    name: "Chevron leather shoulder bag",
    category: "Bags",
    price: 189000,
    stock: 6,
    isNew: true,
    description:
      "A structured flap bag in smooth calf leather, crossed by a painted chevron in butter and ivory. The sliding chain carries it on the shoulder or doubled by hand.",
    details: [
      "Calf leather with hand-painted edges",
      "Sliding curb-chain strap",
      "Magnetic flap closure",
      "Interior slip pocket",
      "W 24 × H 16 × D 7 cm",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1566150905458-1bf1fc113f0d"),
        alt: "Blush leather shoulder bag with a chevron stripe and chain strap",
      },
      {
        src: unsplashDetail("1566150905458-1bf1fc113f0d", 0.45, 0.45, 2),
        alt: "Close view of the painted chevron stripe on the bag's flap",
      },
      {
        src: unsplashDetail("1566150905458-1bf1fc113f0d", 0.85, 0.65, 2.5),
        alt: "Close view of the silver curb-chain strap",
      },
    ],
  },
  {
    slug: "round-metal-sunglasses",
    name: "Round metal sunglasses",
    category: "Eyewear",
    price: 52000,
    stock: 0,
    description:
      "Fine round frames in brushed gold-tone metal with deep green mineral lenses. Light enough to forget you are wearing them.",
    details: [
      "Gold-tone metal frame",
      "Green mineral glass lenses",
      "100% UV protection",
      "Adjustable nose pads",
      "Leather case included",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1511499767150-a48a237f0083"),
        alt: "Round gold-frame sunglasses with green lenses on a white surface",
      },
      {
        src: unsplashDetail("1511499767150-a48a237f0083", 0.35, 0.45, 2.5),
        alt: "Close view of the green lenses and gold bridge",
      },
      {
        src: unsplashDetail("1511499767150-a48a237f0083", 0.72, 0.45, 2.5),
        alt: "Close view of the thin gold temple arm",
      },
    ],
  },
  {
    slug: "botanical-print-pump",
    name: "Botanical print pump",
    category: "Shoes",
    price: 98000,
    stock: 2,
    isNew: true,
    description:
      "A pointed stiletto pump in printed silk satin, covered in peonies and trailing leaves on a cobalt ground. A 105 mm heel, balanced for an evening on your feet.",
    details: [
      "Printed silk satin upper",
      "Leather lining and sole",
      "105 mm covered heel",
      "Pointed toe",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1543163521-1bf539c55dd2"),
        alt: "Pair of floral print stiletto pumps against a pale blue wall",
      },
      {
        src: unsplashDetail("1543163521-1bf539c55dd2", 0.62, 0.32, 2.2),
        alt: "Close view of the peony print across the pump's upper",
      },
      {
        src: unsplashDetail("1543163521-1bf539c55dd2", 0.45, 0.72, 2.2),
        alt: "Side view of the pump showing the slim covered heel",
      },
    ],
  },
  {
    slug: "pearl-strand-necklace",
    name: "Pearl strand necklace",
    category: "Jewelry",
    price: 145000,
    stock: 1,
    description:
      "A single strand of hand-knotted freshwater pearls, finished with a pavé rose clasp that can be worn at the front or the nape.",
    details: [
      "7–8 mm freshwater pearls",
      "Hand-knotted on silk",
      "Sterling silver clasp with crystal pavé",
      "Length 45 cm",
      "Presented in a lacquered box",
    ],
    images: [
      {
        src: unsplash("1515562141207-7a88fb7ce338"),
        alt: "Single strand pearl necklace resting in an open jewelry box",
      },
      {
        src: unsplashDetail("1515562141207-7a88fb7ce338", 0.55, 0.62, 2.5),
        alt: "Close view of the pavé rose clasp between the pearls",
      },
      {
        src: unsplashDetail("1515562141207-7a88fb7ce338", 0.45, 0.38, 1.6),
        alt: "The pearl strand curving across the box's white lining",
      },
    ],
  },
  {
    slug: "fringed-knit-poncho",
    name: "Fringed knit poncho",
    category: "Ready-to-wear",
    price: 116000,
    stock: 12,
    description:
      "An open-stitch poncho in undyed cotton and linen, cut on a deep V and finished with a hand-tied fringe. Layer it over a slip or a fine knit.",
    details: [
      "70% cotton, 30% linen",
      "Open mesh stitch",
      "Hand-tied fringe hem",
      "One size",
      "Made in Portugal",
    ],
    images: [
      {
        src: unsplash("1434389677669-e08b4cac3105"),
        alt: "Cream open-knit poncho with fringed hem on a wooden hanger",
      },
      {
        src: unsplashDetail("1434389677669-e08b4cac3105", 0.5, 0.55, 2.5),
        alt: "Close view of the open mesh stitch",
      },
      {
        src: unsplashDetail("1434389677669-e08b4cac3105", 0.5, 0.85, 2.5),
        alt: "Close view of the hand-tied fringe at the hem",
      },
    ],
  },
  {
    slug: "satin-bomber-jacket",
    name: "Satin bomber jacket",
    category: "Ready-to-wear",
    price: 235000,
    stock: 3,
    isNew: true,
    description:
      "The bomber, refined: washed duchess satin in rust, with a rib-knit collar and hem and a two-way zip. Cut slightly long through the body.",
    details: [
      "100% silk duchess satin",
      "Cupro lining",
      "Rib-knit collar, cuffs and hem",
      "Two-way metal zip",
      "Utility sleeve pocket",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1591047139829-d91aecb6caea"),
        alt: "Rust satin bomber jacket held up on a hanger",
      },
      {
        src: unsplashDetail("1591047139829-d91aecb6caea", 0.55, 0.25, 2.5),
        alt: "Close view of the rib-knit collar and zip",
      },
      {
        src: unsplashDetail("1591047139829-d91aecb6caea", 0.5, 0.8, 2.2),
        alt: "Close view of the ribbed hem and side pockets",
      },
    ],
  },
  {
    slug: "silk-jogger-trouser",
    name: "Silk jogger trouser",
    category: "Ready-to-wear",
    price: 128000,
    stock: 9,
    description:
      "Relaxed trousers in sand-washed silk with an elasticated waist, patch pockets and gathered cuffs. Easy enough for travel, polished enough for dinner.",
    details: [
      "100% sand-washed silk",
      "Elasticated waist",
      "Front patch pockets",
      "Gathered ankle cuffs",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1594633312681-425c7b97ccd1"),
        alt: "Model wearing dusty pink silk trousers with cuffed ankles",
      },
      {
        src: unsplashDetail("1594633312681-425c7b97ccd1", 0.45, 0.2, 2.2),
        alt: "Close view of the elasticated waist and patch pockets",
      },
      {
        src: unsplashDetail("1594633312681-425c7b97ccd1", 0.5, 0.5, 1.6),
        alt: "The silk falling from hip to gathered cuff",
      },
    ],
  },
  {
    slug: "belted-crepe-playsuit",
    name: "Belted crepe playsuit",
    category: "Ready-to-wear",
    price: 142000,
    stock: 5,
    description:
      "A camisole playsuit in olive crepe, cinched by a self-covered belt and ring buckle. Shoulder straps are finished with hand-braided cord.",
    details: [
      "100% viscose crepe",
      "Self-covered belt with ring buckle",
      "Braided cord straps",
      "Concealed side zip",
      "Made in Italy",
    ],
    images: [
      {
        src: unsplash("1618932260643-eee4a2f652a6"),
        alt: "Olive belted playsuit hanging against a white wall",
      },
      {
        src: unsplashDetail("1618932260643-eee4a2f652a6", 0.55, 0.6, 2.5),
        alt: "Close view of the covered belt and ring buckle",
      },
      {
        src: unsplashDetail("1618932260643-eee4a2f652a6", 0.55, 0.15, 2.5),
        alt: "Close view of the braided cord straps",
      },
    ],
  },
];
