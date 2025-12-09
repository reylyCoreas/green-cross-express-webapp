export type Category =
  | "flower"
  | "edibles"
  | "concentrates"
  | "vapes"
  | "pre-rolls"
  | "topicals"
  | "accessories";

export type Strain = "indica" | "sativa" | "hybrid" | "cbd";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: Category;
  strain: Strain | null;
  weightLabel?: string;
  thcPercent?: number;
  cbdPercent?: number;
  featured?: boolean;
  description: string;
  imageUrl: string;
};

export const products: Product[] = [
  {
    id: "blue-dream",
    name: "Blue Dream",
    price: 45,
    category: "flower",
    strain: "hybrid",
    weightLabel: "3.5g",
    thcPercent: 21,
    cbdPercent: 0.1,
    featured: true,
    imageUrl:
      "https://images.pexels.com/photos/7667906/pexels-photo-7667906.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "A legendary hybrid that balances full-body relaxation with gentle cerebral invigoration.",
  },
  {
    id: "og-kush",
    name: "OG Kush",
    price: 55,
    category: "flower",
    strain: "indica",
    weightLabel: "3.5g",
    thcPercent: 24,
    cbdPercent: 0.3,
    featured: true,
    imageUrl:
      "https://images.pexels.com/photos/6065060/pexels-photo-6065060.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Classic indica strain with complex aroma of fuel and spice. Perfect for evening relaxation.",
  },
  {
    id: "sour-diesel",
    name: "Sour Diesel",
    price: 50,
    category: "flower",
    strain: "sativa",
    weightLabel: "3.5g",
    thcPercent: 22,
    cbdPercent: 0.2,
    featured: true,
    imageUrl:
      "https://images.pexels.com/photos/7667937/pexels-photo-7667937.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Energizing sativa with pungent diesel aroma. Great for daytime creativity and focus.",
  },
  {
    id: "gummy-bears-100mg",
    name: "Gummy Bears 100mg",
    price: 25,
    category: "edibles",
    strain: "hybrid",
    weightLabel: "100mg",
    featured: true,
    imageUrl:
      "https://images.pexels.com/photos/12002720/pexels-photo-12002720.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Assorted fruit-flavored gummies, 10 pieces at 10mg each for precise dosing.",
  },
  {
    id: "live-resin-cartridge",
    name: "Live Resin Cartridge",
    price: 65,
    category: "vapes",
    strain: "hybrid",
    weightLabel: "1g",
    imageUrl:
      "https://images.pexels.com/photos/7667893/pexels-photo-7667893.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "High-potency live resin cartridge with full-spectrum flavor and effects.",
  },
  {
    id: "pre-roll-5-pack",
    name: "Pre-Roll 5-Pack",
    price: 35,
    category: "pre-rolls",
    strain: "hybrid",
    weightLabel: "5 x 0.7g",
    imageUrl:
      "https://images.pexels.com/photos/7667724/pexels-photo-7667724.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Five handcrafted pre-rolls for convenient on-the-go sessions.",
  },
  {
    id: "cooling-topical",
    name: "Cooling Relief Topical",
    price: 40,
    category: "topicals",
    strain: null,
    imageUrl:
      "https://images.pexels.com/photos/3738341/pexels-photo-3738341.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Fast-absorbing mentholated cream for targeted relief without psychoactive effects.",
  },
  {
    id: "cbd-tincture",
    name: "CBD Tincture 1000mg",
    price: 70,
    category: "concentrates",
    strain: "cbd",
    imageUrl:
      "https://images.pexels.com/photos/7667730/pexels-photo-7667730.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "High-CBD tincture for daily wellness with minimal THC.",
  },
  {
    id: "glass-pipe",
    name: "Hand-Blown Glass Pipe",
    price: 30,
    category: "accessories",
    strain: null,
    imageUrl:
      "https://images.pexels.com/photos/11135639/pexels-photo-11135639.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Durable glass pipe with deep bowl and comfortable grip.",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
