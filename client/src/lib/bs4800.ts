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
  // Whites & Neutrals
  c("#f5f2ec", "00 A 01", "Brilliant White", "Whites & Neutrals"),
  c("#f0ece4", "00 A 02", "Pure White", "Whites & Neutrals"),
  c("#e8e4dc", "00 A 03", "Off White", "Whites & Neutrals"),
  c("#ddd8cc", "00 A 05", "Magnolia", "Whites & Neutrals"),
  c("#d4cfc0", "08 B 15", "Cream", "Whites & Neutrals"),
  c("#c9c3b3", "08 B 17", "Ivory", "Whites & Neutrals"),
  c("#bfb9a8", "08 B 21", "Linen", "Whites & Neutrals"),
  c("#b5af9e", "10 B 15", "Sand", "Whites & Neutrals"),
  c("#a8a290", "10 B 17", "Oatmeal", "Whites & Neutrals"),
  c("#9c9582", "10 B 19", "Biscuit", "Whites & Neutrals"),
  c("#8e8775", "10 B 21", "Manilla", "Whites & Neutrals"),
  c("#7d7565", "10 B 25", "Hessian", "Whites & Neutrals"),
  c("#6b6356", "10 B 27", "Cork", "Whites & Neutrals"),
  c("#5a5347", "10 B 29", "Bamboo", "Whites & Neutrals"),
  c("#4a443a", "10 B 31", "Teak", "Whites & Neutrals"),
  c("#3a342c", "10 B 33", "Walnut", "Whites & Neutrals"),
  c("#e0dccf", "00 E 55", "White Stone", "Whites & Neutrals"),
  c("#d2cebf", "02 C 31", "Limestone", "Whites & Neutrals"),
  c("#c5c0b0", "02 C 33", "Pebble", "Whites & Neutrals"),
  c("#b8b3a2", "04 C 35", "Driftwood", "Whites & Neutrals"),
  c("#a8a390", "04 C 37", "Stone", "Whites & Neutrals"),
  c("#989380", "06 C 39", "Putty", "Whites & Neutrals"),
  c("#888370", "06 C 41", "Mushroom", "Whites & Neutrals"),
  c("#787360", "08 C 43", "Taupe", "Whites & Neutrals"),
  c("#686352", "08 C 45", "Mocha", "Whites & Neutrals"),
  c("#5a5546", "10 C 39", "Bark", "Whites & Neutrals"),
  c("#4a4538", "10 C 41", "Espresso", "Whites & Neutrals"),
  c("#3a352c", "10 C 43", "Dark Bark", "Whites & Neutrals"),

  // Greys
  c("#e8e8e6", "00 A 09", "Mist Grey", "Greys"),
  c("#d0d0ce", "00 A 11", "Light Grey", "Greys"),
  c("#b8b8b6", "00 A 13", "Silver Grey", "Greys"),
  c("#a0a09e", "00 A 15", "Cloud Grey", "Greys"),
  c("#888886", "00 A 17", "Smoke Grey", "Greys"),
  c("#70706e", "00 A 19", "Slate Grey", "Greys"),
  c("#58585a", "00 A 21", "Graphite", "Greys"),
  c("#404042", "00 A 23", "Charcoal", "Greys"),
  c("#28282a", "00 A 25", "Jet Black", "Greys"),
  c("#d4d6d8", "12 B 21", "Pewter", "Greys"),
  c("#b8babc", "12 B 23", "Gunmetal", "Greys"),
  c("#9c9ea0", "12 B 25", "Lead", "Greys"),
  c("#808284", "12 B 27", "Iron Grey", "Greys"),
  c("#646668", "12 B 29", "Steel Grey", "Greys"),
  c("#484a4c", "12 B 31", "Anthracite", "Greys"),

  // Reds & Earth Tones
  c("#f5e0d8", "04 D 15", "Blush Pink", "Reds & Earth Tones"),
  c("#e8c8b8", "04 D 17", "Salmon", "Reds & Earth Tones"),
  c("#d8a890", "06 D 19", "Terracotta", "Reds & Earth Tones"),
  c("#c88870", "06 D 21", "Rust", "Reds & Earth Tones"),
  c("#b86850", "08 D 23", "Brick Red", "Reds & Earth Tones"),
  c("#a04830", "08 D 25", "Terra Rose", "Reds & Earth Tones"),
  c("#883820", "08 D 27", "Burnt Sienna", "Reds & Earth Tones"),
  c("#702818", "08 D 29", "Mahogany", "Reds & Earth Tones"),
  c("#581810", "08 D 31", "Dark Red", "Reds & Earth Tones"),
  c("#e8d0c0", "02 E 55", "Clay", "Reds & Earth Tones"),
  c("#d8b8a0", "04 E 57", "Adobe", "Reds & Earth Tones"),
  c("#c89880", "06 E 59", "Copper", "Reds & Earth Tones"),
  c("#b87860", "08 E 61", "Cinnamon", "Reds & Earth Tones"),
  c("#a05840", "08 E 63", "Spice", "Reds & Earth Tones"),
  c("#883828", "10 E 59", "Crimson", "Reds & Earth Tones"),
  c("#682018", "10 E 61", "Garnet", "Reds & Earth Tones"),
  c("#481010", "10 E 63", "Wine", "Reds & Earth Tones"),
  c("#f0d8c8", "06 C 45", "Peach", "Reds & Earth Tones"),
  c("#e0b898", "08 C 47", "Apricot", "Reds & Earth Tones"),
  c("#c89868", "10 C 49", "Caramel", "Reds & Earth Tones"),
  c("#a87848", "12 C 51", "Bronze", "Reds & Earth Tones"),
  c("#885828", "14 C 53", "Ochre", "Reds & Earth Tones"),
  c("#683818", "14 C 55", "Umber", "Reds & Earth Tones"),

  // Browns
  c("#e8d0b0", "06 B 25", "Almond", "Browns"),
  c("#d0b890", "08 B 27", "Hazelnut", "Browns"),
  c("#b89868", "10 B 29", "Caramel Brown", "Browns"),
  c("#a07848", "12 B 31", "Tobacco", "Browns"),
  c("#885828", "14 B 33", "Chocolate", "Browns"),
  c("#683818", "14 B 35", "Coffee", "Browns"),
  c("#482810", "14 B 37", "Dark Chocolate", "Browns"),

  // Oranges & Yellows
  c("#f8e8c8", "10 C 35", "Vanilla", "Oranges & Yellows"),
  c("#f0d098", "10 C 37", "Buttercup", "Oranges & Yellows"),
  c("#e8b878", "12 C 39", "Honey", "Oranges & Yellows"),
  c("#d89858", "12 C 41", "Amber", "Oranges & Yallows"),
  c("#c87838", "14 C 43", "Pumpkin", "Oranges & Yellows"),
  c("#b85818", "14 C 45", "Tangerine", "Oranges & Yellows"),
  c("#a83808", "14 C 47", "Burnt Orange", "Oranges & Yellows"),
  c("#f5e8a0", "08 C 33", "Primrose", "Oranges & Yellows"),
  c("#e8d070", "10 C 35", "Sunflower", "Oranges & Yellows"),
  c("#d8b848", "10 C 37", "Mustard", "Oranges & Yellows"),
  c("#c89828", "12 C 39", "Goldenrod", "Oranges & Yellows"),
  c("#a87818", "12 C 41", "Bronze Gold", "Oranges & Yellows"),

  // Greens
  c("#e8f0d8", "14 C 35", "Mint Cream", "Greens"),
  c("#c8e0b0", "14 C 37", "Spring Green", "Greens"),
  c("#a8d088", "14 C 39", "Apple Green", "Greens"),
  c("#88b868", "14 C 41", "Olive Green", "Greens"),
  c("#689848", "14 C 43", "Forest Green", "Greens"),
  c("#487828", "14 C 45", "Pine Green", "Greens"),
  c("#285818", "14 C 47", "Dark Green", "Greens"),
  c("#184008", "14 C 49", "Bottle Green", "Greens"),
  c("#d8e8c8", "12 C 31", "Sage", "Greens"),
  c("#b8d0a8", "12 C 33", "Lime", "Greens"),
  c("#98b888", "12 C 35", "Moss", "Greens"),
  c("#789868", "12 C 37", "Fern", "Greens"),
  c("#587848", "12 C 39", "Hunter Green", "Greens"),
  c("#385828", "12 C 41", "Spruce", "Greens"),
  c("#283818", "12 C 43", "Evergreen", "Greens"),
  c("#e0e8d0", "10 C 29", "Sea Green", "Greens"),
  c("#c0d0b0", "10 C 31", "Eucalyptus", "Greens"),
  c("#a0b890", "10 C 33", "Jade", "Greens"),
  c("#809870", "10 C 35", "Avocado", "Greens"),
  c("#607850", "10 C 37", "Meadow", "Greens"),
  c("#405830", "10 C 39", "Forest", "Greens"),
  c("#203810", "10 C 41", "Pine", "Greens"),

  // Blues
  c("#e0e8f0", "18 C 31", "Sky Blue", "Blues"),
  c("#c0d0e8", "18 C 33", "Powder Blue", "Blues"),
  c("#a0b8d8", "18 C 35", "Periwinkle", "Blues"),
  c("#8098c8", "18 C 37", "Cornflower", "Blues"),
  c("#6078b8", "18 C 39", "Azure", "Blues"),
  c("#4058a8", "18 C 41", "Cobalt", "Blues"),
  c("#283898", "18 C 43", "Royal Blue", "Blues"),
  c("#181878", "18 C 45", "Navy", "Blues"),
  c("#080858", "18 C 47", "Midnight Blue", "Blues"),
  c("#d0e0e8", "20 C 31", "Ice Blue", "Blues"),
  c("#b0c8d8", "20 C 33", "Steel Blue", "Blues"),
  c("#90b0c8", "20 C 35", "Slate Blue", "Blues"),
  c("#7098b8", "20 C 37", "Denim", "Blues"),
  c("#5078a8", "20 C 39", "Peacock", "Blues"),
  c("#305898", "20 C 41", "Ocean Blue", "Blues"),
  c("#183878", "20 C 43", "Prussian Blue", "Blues"),
  c("#081858", "20 C 45", "Indigo", "Blues"),
  c("#c8d8e8", "22 C 29", "Mist Blue", "Blues"),
  c("#a0b8d0", "22 C 31", "Lavender Blue", "Blues"),
  c("#7898b8", "22 C 33", "Wisteria", "Blues"),
  c("#5078a0", "22 C 35", "Delft", "Blues"),
  c("#285888", "22 C 37", "Teal Blue", "Blues"),
  c("#003878", "22 C 39", "Sapphire", "Blues"),
  c("#001858", "22 C 41", "Ultramarine", "Blues"),

  // Violets & Purples
  c("#e8d8e8", "22 C 25", "Lilac", "Violets & Purples"),
  c("#c8b0c8", "22 C 27", "Mauve", "Violets & Purples"),
  c("#a888a8", "22 C 29", "Lavender", "Violets & Purples"),
  c("#886088", "24 C 31", "Orchid", "Violets & Purples"),
  c("#683868", "24 C 33", "Plum", "Violets & Purples"),
  c("#481848", "24 C 35", "Grape", "Violets & Purples"),
  c("#280828", "24 C 37", "Eggplant", "Violets & Purples"),
];

export const SHADE_FAMILIES = [
  "All",
  "Whites & Neutrals",
  "Greys",
  "Reds & Earth Tones",
  "Browns",
  "Oranges & Yellows",
  "Greens",
  "Blues",
  "Violets & Purples",
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
