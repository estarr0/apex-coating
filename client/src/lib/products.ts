// Apex Coating Product Catalog

export interface ProductSize {
  label: string;
  volume: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  defaultColor: string;
  features: string[];
  badge?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "weathershield",
    name: "Apex WeatherShield Exterior",
    category: "Exterior",
    description: "Premium all-weather exterior emulsion with UV-resistant formulation. Designed to withstand East Africa's harshest climates while maintaining color vibrancy for up to 10 years.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 850 },
      { label: "4L", volume: "4 Litres", price: 2900 },
      { label: "20L", volume: "20 Litre Drum", price: 11500 },
    ],
    defaultColor: "00 A 01",
    features: ["UV Resistant", "10-Year Color Guarantee", "Rain Guard Technology", "Anti-Fungal"],
    badge: "Best Seller",
  },
  {
    id: "silk-emulsion",
    name: "Apex Silk Emulsion",
    category: "Decorative",
    description: "Luxurious silk-finish interior emulsion with a smooth, washable surface. Creates an elegant soft sheen that enhances any interior space.",
    image: "/manus-storage/product-bucket-white_bbbaee2c.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 720 },
      { label: "4L", volume: "4 Litres", price: 2450 },
      { label: "20L", volume: "20 Litre Drum", price: 9800 },
    ],
    defaultColor: "00 A 02",
    features: ["Washable Finish", "Low VOC", "Quick Dry", "Silk Sheen"],
  },
  {
    id: "industrial-primer",
    name: "Apex Heavy Industrial Primer",
    category: "Industrial",
    description: "High-adhesion industrial primer formulated for metal, concrete, and masonry substrates. Provides exceptional corrosion resistance and surface preparation for heavy-duty coatings.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 1100 },
      { label: "4L", volume: "4 Litres", price: 3800 },
      { label: "20L", volume: "20 Litre Drum", price: 15500 },
    ],
    defaultColor: "00 A 17",
    features: ["Corrosion Resistant", "High Adhesion", "Rust Inhibitor", "Industrial Grade"],
    badge: "Industrial",
  },
  {
    id: "gloss-enamel",
    name: "Apex Gloss Enamel",
    category: "Decorative",
    description: "High-gloss enamel finish for doors, trim, and metal surfaces. Delivers a mirror-like shine with exceptional durability and scratch resistance.",
    image: "/manus-storage/product-bucket-gloss_56387446.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 950 },
      { label: "4L", volume: "4 Litres", price: 3200 },
      { label: "20L", volume: "20 Litre Drum", price: 12800 },
    ],
    defaultColor: "08 D 25",
    features: ["High Gloss", "Scratch Resistant", "Fast Drying", "Mirror Finish"],
  },
  {
    id: "wood-finish",
    name: "Apex Wood Finish",
    category: "Wood Finishes",
    description: "Premium wood coating that enhances natural grain while providing superior protection. Available in matte and satin finishes for furniture, doors, and architectural woodwork.",
    image: "/manus-storage/product-bucket-wood_797fac2f.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 1050 },
      { label: "4L", volume: "4 Litres", price: 3600 },
      { label: "20L", volume: "20 Litre Drum", price: 14200 },
    ],
    defaultColor: "10 B 25",
    features: ["Grain Enhancing", "Water Resistant", "UV Protection", "Satin Finish"],
  },
  {
    id: "roofguard",
    name: "Apex RoofGuard",
    category: "Exterior",
    description: "Specialized roof coating with thermal insulation properties. Reflects up to 90% of solar heat, reducing indoor temperatures by up to 5°C. Elastomeric formulation bridges hairline cracks.",
    image: "/manus-storage/product-bucket-roof_35f3cf0b.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 1200 },
      { label: "4L", volume: "4 Litres", price: 4100 },
      { label: "20L", volume: "20 Litre Drum", price: 16500 },
    ],
    defaultColor: "08 D 21",
    features: ["Thermal Insulation", "Crack Bridging", "90% Solar Reflectance", "Elastomeric"],
    badge: "Eco",
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Decorative",
  "Exterior",
  "Industrial",
  "Wood Finishes",
];

export const FINISHES = [
  { id: "matte", name: "Matte", description: "Flat, non-reflective finish" },
  { id: "silk", name: "Silk", description: "Soft sheen, washable" },
  { id: "eggshell", name: "Eggshell", description: "Subtle low sheen" },
  { id: "gloss", name: "Gloss", description: "High shine, durable" },
  { id: "weather-guard", name: "Weather-Guard Textured", description: "Textured, all-weather" },
];

export const ROOM_SCENES = [
  {
    id: "living",
    name: "Modern Living Room",
    image: "/manus-storage/room-living_915e7a0d.jpg",
    wallSelector: "wall-living",
  },
  {
    id: "office",
    name: "Commercial Office",
    image: "/manus-storage/room-office_8d7e7cab.jpg",
    wallSelector: "wall-office",
  },
  {
    id: "exterior",
    name: "Exterior Facade",
    image: "/manus-storage/room-exterior_897ac90f.jpg",
    wallSelector: "wall-exterior",
  },
];

export function formatKES(amount: number): string {
  return "KES " + amount.toLocaleString("en-KE");
}
