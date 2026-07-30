// BS 4800 Standard Color Collection
// Comprehensive shade library for Apex Coating East Africa Ltd

export interface BSColor {
  code: string;
  name: string;
  hex: string;
  r: number;
  g: number;
  b: number;
  family: string;
}

// Helper to convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function c(hex: string, code: string, name: string, family: string): BSColor {
  const { r, g, b } = hexToRgb(hex);
  return { code, name, hex, r, g, b, family };
}

export const BS4800_COLORS: BSColor[] = [
  // Whites & Off-Whites
  c("#f5f2ec", "00 A 01", "Brilliant White", "Whites & Off-Whites"),
  c("#f0ece4", "00 A 02", "Pure White", "Whites & Off-Whites"),
  c("#e8e4dc", "00 A 03", "Off White", "Whites & Off-Whites"),
  c("#ddd8cc", "00 A 05", "Magnolia", "Whites & Off-Whites"),
  c("#d4cfc0", "08 B 15", "Cream", "Whites & Off-Whites"),
  c("#c9c3b3", "08 B 17", "Ivory", "Whites & Off-Whites"),
  c("#bfb9a8", "08 B 21", "Linen", "Whites & Off-Whites"),
  c("#b5af9e", "10 B 15", "Sand", "Whites & Off-Whites"),
  c("#a8a290", "10 B 17", "Oatmeal", "Whites & Off-Whites"),
  c("#9c9582", "10 B 19", "Biscuit", "Whites & Off-Whites"),
  c("#8e8775", "10 B 21", "Manilla", "Whites & Off-Whites"),
  c("#7d7565", "10 B 25", "Hessian", "Whites & Off-Whites"),
  c("#6b6356", "10 B 27", "Cork", "Whites & Off-Whites"),
  c("#5a5347", "10 B 29", "Bamboo", "Whites & Off-Whites"),
  c("#4a443a", "10 B 31", "Teak", "Whites & Off-Whites"),
  c("#3a342c", "10 B 33", "Walnut", "Whites & Off-Whites"),
  c("#e0dccf", "00 E 55", "White Stone", "Whites & Off-Whites"),
  c("#d2cebf", "02 C 31", "Limestone", "Whites & Off-Whites"),
  c("#c5c0b0", "02 C 33", "Pebble", "Whites & Off-Whites"),
  c("#b8b3a2", "04 C 35", "Driftwood", "Whites & Off-Whites"),
  c("#a8a390", "04 C 37", "Stone", "Whites & Off-Whites"),
  c("#989380", "06 C 39", "Putty", "Whites & Off-Whites"),
  c("#888370", "06 C 41", "Mushroom", "Whites & Off-Whites"),
  c("#787360", "08 C 43", "Taupe", "Whites & Off-Whites"),
  c("#686352", "08 C 45", "Mocha", "Whites & Off-Whites"),
  c("#5a5546", "10 C 39", "Bark", "Whites & Off-Whites"),
  c("#4a4538", "10 C 41", "Espresso", "Whites & Off-Whites"),
  c("#3a352c", "10 C 43", "Dark Bark", "Whites & Off-Whites"),

  // Deep Industrial Darks
  c("#e8e8e6", "00 A 09", "Mist Grey", "Deep Industrial Darks"),
  c("#d0d0ce", "00 A 11", "Light Grey", "Deep Industrial Darks"),
  c("#b8b8b6", "00 A 13", "Silver Grey", "Deep Industrial Darks"),
  c("#a0a09e", "00 A 15", "Cloud Grey", "Deep Industrial Darks"),
  c("#888886", "00 A 17", "Smoke Grey", "Deep Industrial Darks"),
  c("#70706e", "00 A 19", "Slate Grey", "Deep Industrial Darks"),
  c("#58585a", "00 A 21", "Graphite", "Deep Industrial Darks"),
  c("#404042", "00 A 23", "Charcoal", "Deep Industrial Darks"),
  c("#28282a", "00 A 25", "Jet Black", "Deep Industrial Darks"),
  c("#d4d6d8", "12 B 21", "Pewter", "Deep Industrial Darks"),
  c("#b8babc", "12 B 23", "Gunmetal", "Deep Industrial Darks"),
  c("#9c9ea0", "12 B 25", "Lead", "Deep Industrial Darks"),
  c("#808284", "12 B 27", "Iron Grey", "Deep Industrial Darks"),
  c("#646668", "12 B 29", "Steel Grey", "Deep Industrial Darks"),
  c("#484a4c", "12 B 31", "Anthracite", "Deep Industrial Darks"),

  // Pastels & Warm Earth
  c("#f5e0d8", "04 D 15", "Blush Pink", "Pastels & Warm Earth"),
  c("#e8c8b8", "04 D 17", "Salmon", "Pastels & Warm Earth"),
  c("#d8a890", "06 D 19", "Terracotta", "Pastels & Warm Earth"),
  c("#c88870", "06 D 21", "Rust", "Pastels & Warm Earth"),
  c("#b86850", "08 D 23", "Brick Red", "Pastels & Warm Earth"),
  c("#a04830", "08 D 25", "Terra Rose", "Pastels & Warm Earth"),
  c("#883820", "08 D 27", "Burnt Sienna", "Pastels & Warm Earth"),
  c("#702818", "08 D 29", "Mahogany", "Pastels & Warm Earth"),
  c("#581810", "08 D 31", "Dark Red", "Pastels & Warm Earth"),
  c("#e8d0c0", "02 E 55", "Clay", "Pastels & Warm Earth"),
  c("#d8b8a0", "04 E 57", "Adobe", "Pastels & Warm Earth"),
  c("#c89880", "06 E 59", "Copper", "Pastels & Warm Earth"),
  c("#b87860", "08 E 61", "Cinnamon", "Pastels & Warm Earth"),
  c("#a05840", "08 E 63", "Spice", "Pastels & Warm Earth"),
  c("#883828", "10 E 59", "Crimson", "Pastels & Warm Earth"),
  c("#682018", "10 E 61", "Garnet", "Pastels & Warm Earth"),
  c("#481010", "10 E 63", "Wine", "Pastels & Warm Earth"),
  c("#f0d8c8", "06 C 45", "Peach", "Pastels & Warm Earth"),
  c("#e0b898", "08 C 47", "Apricot", "Pastels & Warm Earth"),
  c("#c89868", "10 C 49", "Caramel", "Pastels & Warm Earth"),
  c("#a87848", "12 C 51", "Bronze", "Pastels & Warm Earth"),
  c("#885828", "14 C 53", "Ochre", "Pastels & Warm Earth"),
  c("#683818", "14 C 55", "Umber", "Pastels & Warm Earth"),

  // Pastels & Warm Earth
  c("#e8d0b0", "06 B 25", "Almond", "Pastels & Warm Earth"),
  c("#d0b890", "08 B 27", "Hazelnut", "Pastels & Warm Earth"),
  c("#b89868", "10 B 29", "Caramel Brown", "Pastels & Warm Earth"),
  c("#a07848", "12 B 31", "Tobacco", "Pastels & Warm Earth"),
  c("#885828", "14 B 33", "Chocolate", "Pastels & Warm Earth"),
  c("#683818", "14 B 35", "Coffee", "Pastels & Warm Earth"),
  c("#482810", "14 B 37", "Dark Chocolate", "Pastels & Warm Earth"),

  // Pastels & Warm Earth
  c("#f8e8c8", "10 C 35", "Vanilla", "Pastels & Warm Earth"),
  c("#f0d098", "10 C 37", "Buttercup", "Pastels & Warm Earth"),
  c("#e8b878", "12 C 39", "Honey", "Pastels & Warm Earth"),
  c("#d89858", "12 C 41", "Amber", "Pastels & Warm Earth"),
  c("#c87838", "14 C 43", "Pumpkin", "Pastels & Warm Earth"),
  c("#b85818", "14 C 45", "Tangerine", "Pastels & Warm Earth"),
  c("#a83808", "14 C 47", "Burnt Orange", "Pastels & Warm Earth"),
  c("#f5e8a0", "08 C 33", "Primrose", "Pastels & Warm Earth"),
  c("#e8d070", "08 C 31", "Sunflower", "Pastels & Warm Earth"),
  c("#d8b848", "10 C 33", "Mustard", "Pastels & Warm Earth"),
  c("#c89828", "10 C 35", "Goldenrod", "Pastels & Warm Earth"),
  c("#a87818", "10 C 37", "Bronze Gold", "Pastels & Warm Earth"),

  // Fresh Greens & Blues
  c("#e8f0d8", "14 C 35", "Mint Cream", "Fresh Greens & Blues"),
  c("#c8e0b0", "14 C 37", "Spring Green", "Fresh Greens & Blues"),
  c("#a8d088", "14 C 39", "Apple Green", "Fresh Greens & Blues"),
  c("#88b868", "14 C 41", "Olive Green", "Fresh Greens & Blues"),
  c("#689848", "14 C 43", "Forest Green", "Fresh Greens & Blues"),
  c("#487828", "14 C 45", "Pine Green", "Fresh Greens & Blues"),
  c("#285818", "14 C 47", "Dark Green", "Fresh Greens & Blues"),
  c("#184008", "14 C 49", "Bottle Green", "Fresh Greens & Blues"),
  c("#d8e8c8", "12 C 31", "Sage", "Fresh Greens & Blues"),
  c("#b8d0a8", "12 C 33", "Lime", "Fresh Greens & Blues"),
  c("#98b888", "12 C 35", "Moss", "Fresh Greens & Blues"),
  c("#789868", "12 C 37", "Fern", "Fresh Greens & Blues"),
  c("#587848", "12 C 39", "Hunter Green", "Fresh Greens & Blues"),
  c("#385828", "12 C 41", "Spruce", "Fresh Greens & Blues"),
  c("#283818", "12 C 43", "Evergreen", "Fresh Greens & Blues"),
  c("#e0e8d0", "10 C 29", "Sea Green", "Fresh Greens & Blues"),
  c("#c0d0b0", "10 C 31", "Eucalyptus", "Fresh Greens & Blues"),
  c("#a0b890", "10 C 33", "Jade", "Fresh Greens & Blues"),
  c("#809870", "10 C 35", "Avocado", "Fresh Greens & Blues"),
  c("#607850", "10 C 37", "Meadow", "Fresh Greens & Blues"),
  c("#405830", "10 C 39", "Forest", "Fresh Greens & Blues"),
  c("#203810", "10 C 41", "Pine", "Fresh Greens & Blues"),

  // Fresh Greens & Blues
  c("#e0e8f0", "18 C 31", "Sky Blue", "Fresh Greens & Blues"),
  c("#c0d0e8", "18 C 33", "Powder Blue", "Fresh Greens & Blues"),
  c("#a0b8d8", "18 C 35", "Periwinkle", "Fresh Greens & Blues"),
  c("#8098c8", "18 C 37", "Cornflower", "Fresh Greens & Blues"),
  c("#6078b8", "18 C 39", "Azure", "Fresh Greens & Blues"),
  c("#4058a8", "18 C 41", "Cobalt", "Fresh Greens & Blues"),
  c("#283898", "18 C 43", "Royal Blue", "Fresh Greens & Blues"),
  c("#181878", "18 C 45", "Navy", "Fresh Greens & Blues"),
  c("#080858", "18 C 47", "Midnight Blue", "Fresh Greens & Blues"),
  c("#d0e0e8", "20 C 31", "Ice Blue", "Fresh Greens & Blues"),
  c("#b0c8d8", "20 C 33", "Steel Blue", "Fresh Greens & Blues"),
  c("#90b0c8", "20 C 35", "Slate Blue", "Fresh Greens & Blues"),
  c("#7098b8", "20 C 37", "Denim", "Fresh Greens & Blues"),
  c("#5078a8", "20 C 39", "Peacock", "Fresh Greens & Blues"),
  c("#305898", "20 C 41", "Ocean Blue", "Fresh Greens & Blues"),
  c("#183878", "20 C 43", "Prussian Blue", "Fresh Greens & Blues"),
  c("#081858", "20 C 45", "Indigo", "Fresh Greens & Blues"),
  c("#c8d8e8", "22 C 29", "Mist Blue", "Fresh Greens & Blues"),
  c("#a0b8d0", "22 C 31", "Lavender Blue", "Fresh Greens & Blues"),
  c("#7898b8", "22 C 33", "Wisteria", "Fresh Greens & Blues"),
  c("#5078a0", "22 C 35", "Delft", "Fresh Greens & Blues"),
  c("#285888", "22 C 37", "Teal Blue", "Fresh Greens & Blues"),
  c("#003878", "22 C 39", "Sapphire", "Fresh Greens & Blues"),
  c("#001858", "22 C 41", "Ultramarine", "Fresh Greens & Blues"),

  // Pastels & Warm Earth (Lilac family)
  c("#e8d8e8", "22 C 25", "Lilac", "Pastels & Warm Earth"),
  c("#c8b0c8", "22 C 27", "Mauve", "Pastels & Warm Earth"),
  c("#a888a8", "22 C 29", "Lavender", "Pastels & Warm Earth"),
  c("#886088", "24 C 31", "Orchid", "Pastels & Warm Earth"),
  c("#683868", "24 C 33", "Plum", "Pastels & Warm Earth"),
  c("#481848", "24 C 35", "Grape", "Pastels & Warm Earth"),
  c("#280828", "24 C 37", "Eggplant", "Pastels & Warm Earth"),

  // Official Premier Coating Named Shades (per brief)
  c("#f0e6d3", "10 C 31", "Ivory", "Whites & Off-Whites"),
  c("#70706e", "10 A 11", "Slate Grey", "Deep Industrial Darks"),
  c("#a8d088", "10 B 17", "Mistletoe", "Fresh Greens & Blues"),
  c("#9b8a72", "04 B 21", "Toadstool", "Pastels & Warm Earth"),
  c("#c8b898", "10 C 39", "Panatella", "Pastels & Warm Earth"),
  c("#b89868", "08 C 37", "Rawhide", "Pastels & Warm Earth"),
  c("#f5f2ec", "00 A 04", "Soft White", "Whites & Off-Whites"),
  c("#c0d0e8", "18 C 33", "Powder Blue", "Fresh Greens & Blues"),
  c("#c8b0c8", "22 C 27", "Lilac Haze", "Pastels & Warm Earth"),
];

export const SHADE_FAMILIES = [
  "All",
  "Whites & Off-Whites",
  "Pastels & Warm Earth",
  "Fresh Greens & Blues",
  "Deep Industrial Darks",
  "Custom Mixed Shades",
];

export function searchColors(query: string): BSColor[] {
  const q = query.toLowerCase().trim();
  if (!q) return BS4800_COLORS;
  return BS4800_COLORS.filter(
    (c) =>
      c.code.toLowerCase().includes(q) ||
      c.name.toLowerCase().includes(q) ||
      c.family.toLowerCase().includes(q)
  );
}

export function filterByFamily(family: string): BSColor[] {
  if (family === "All") return BS4800_COLORS;
  return BS4800_COLORS.filter((c) => c.family === family);
}

export function getColorByCode(code: string): BSColor | undefined {
  return BS4800_COLORS.find((c) => c.code === code);
}
