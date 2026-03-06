import type { Car } from "../backend.d";

// Re-define category strings to avoid runtime enum issues with .d.ts
export const CategoryValues = {
  sports: "sports",
  sedan: "sedan",
  suv: "suv",
  electric: "electric",
} as const;

export type CategoryString =
  (typeof CategoryValues)[keyof typeof CategoryValues];

export function getCarImage(car: Car): string {
  const name = car.name.toLowerCase();
  if (name.includes("m3")) return "/assets/generated/bmw-m3.dim_900x600.jpg";
  if (name.includes("m5")) return "/assets/generated/bmw-m5.dim_900x600.jpg";
  if (name.includes("7 series") || name.includes("7series"))
    return "/assets/generated/bmw-7series.dim_900x600.jpg";
  if (name.includes("x5")) return "/assets/generated/bmw-x5.dim_900x600.jpg";
  if (name.includes("i8")) return "/assets/generated/bmw-i8.dim_900x600.jpg";
  if (name.includes("ix") || name.includes("i x"))
    return "/assets/generated/bmw-ix.dim_900x600.jpg";

  // Fallback by category
  const cat = car.category as string;
  if (cat === "sports") return "/assets/generated/bmw-m3.dim_900x600.jpg";
  if (cat === "sedan") return "/assets/generated/bmw-m5.dim_900x600.jpg";
  if (cat === "suv") return "/assets/generated/bmw-x5.dim_900x600.jpg";
  if (cat === "electric") return "/assets/generated/bmw-ix.dim_900x600.jpg";
  return "/assets/generated/bmw-m3.dim_900x600.jpg";
}

export function formatPrice(price: bigint): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(price));
}

export function getCategoryLabel(category: string): string {
  const map: Record<string, string> = {
    sports: "Sports",
    sedan: "Sedan",
    suv: "SUV",
    electric: "Electric",
  };
  return map[category] ?? category;
}

export function getCategoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    sports: "badge-sports",
    sedan: "badge-sedan",
    suv: "badge-suv",
    electric: "badge-electric",
  };
  return map[category] ?? "badge-sedan";
}

// Fallback sample cars for when backend is loading
export const fallbackCars: Car[] = [
  {
    id: BigInt(1),
    name: "BMW M3 Competition",
    description:
      "The quintessential sports sedan. With 503 horsepower, the M3 Competition redefines what a four-door performance car can be.",
    acceleration: "3.4s",
    category: "sports" as Car["category"],
    price: BigInt(74900),
    topSpeed: BigInt(180),
    horsepower: BigInt(503),
    featured: true,
  },
  {
    id: BigInt(2),
    name: "BMW M5 Competition",
    description:
      "The ultimate business express. 627 HP of M power wrapped in a luxurious four-door sedan that defies convention.",
    acceleration: "3.1s",
    category: "sedan" as Car["category"],
    price: BigInt(109900),
    topSpeed: BigInt(190),
    horsepower: BigInt(627),
    featured: true,
  },
  {
    id: BigInt(3),
    name: "BMW 7 Series",
    description:
      "The pinnacle of BMW luxury. Handcrafted perfection meets cutting-edge technology in this flagship executive sedan.",
    acceleration: "4.1s",
    category: "sedan" as Car["category"],
    price: BigInt(94500),
    topSpeed: BigInt(155),
    horsepower: BigInt(536),
    featured: true,
  },
  {
    id: BigInt(4),
    name: "BMW X5 M Competition",
    description:
      "Uncompromising performance in an SUV. 617 HP, all-wheel drive mastery, and luxury that commands every road.",
    acceleration: "3.7s",
    category: "suv" as Car["category"],
    price: BigInt(117900),
    topSpeed: BigInt(177),
    horsepower: BigInt(617),
    featured: false,
  },
  {
    id: BigInt(5),
    name: "BMW i8",
    description:
      "A vision of tomorrow, available today. The i8 hybrid supercar fuses electric efficiency with breathtaking design.",
    acceleration: "4.4s",
    category: "sports" as Car["category"],
    price: BigInt(147500),
    topSpeed: BigInt(155),
    horsepower: BigInt(369),
    featured: true,
  },
  {
    id: BigInt(6),
    name: "BMW iX M60",
    description:
      "The future of electric mobility. 610 HP, 300-mile range, and the most advanced technology BMW has ever built.",
    acceleration: "3.8s",
    category: "electric" as Car["category"],
    price: BigInt(109900),
    topSpeed: BigInt(155),
    horsepower: BigInt(610),
    featured: false,
  },
];
