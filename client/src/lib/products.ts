// Apex Coating & Premier Coat — Complete Price List (Effective July 2026)
//
// PRODUCT IMAGE RULES:
// - Images use swap-friendly filenames (e.g. "gloss_enamel.jpg", "synthetic_varnish.png")
// - Fixed aspect ratios in UI so users can swap photos without breaking layout
//
// NO COLOR SELECTION FOR:
// - Seraphic Glues, Spray Adhesives, Thinners, Solvents, Retarders, chemical cleaners
// - These products only allow volume/size variations (no shade picker)

export interface ProductSize {
  label: string;
  volume: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  image: string;
  sizes: ProductSize[];
  defaultColor: string;
  features: string[];
  badge?: string;
  noColorSelection?: boolean; // Chemical products — no shade picker
}

// Categories that are purely chemical — never show color selection
const NO_COLOR_CATEGORIES = new Set([
  "Seraphic Glues",
  "Thinners & Spirits",
]);

export const PRODUCTS: Product[] = [
  // --- DECORATIVE & SPECIALTY RANGE ---
  {
    id: "texstar-emulsion",
    name: "Texstar Emulsion",
    category: "Decorative & Specialty",
    subcategory: "Decorative",
    description: "Premium water-based interior emulsion with excellent coverage and washability. Ideal for walls and ceilings in residential and commercial spaces.",
    image: "/manus-storage/product-bucket-white_bbbaee2c.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 2700 },
      { label: "10L", volume: "10 Litre", price: 1300 },
      { label: "4L", volume: "4 Litre", price: 550 },
    ],
    defaultColor: "00 A 01",
    features: ["Interior", "Washable", "Good Coverage", "Water Based"],
  },
  {
    id: "plastic-emulsion",
    name: "Plastic Emulsion",
    category: "Decorative & Specialty",
    subcategory: "Decorative",
    description: "Economical interior emulsion suitable for walls and ceilings. Provides good coverage with a smooth finish at competitive prices.",
    image: "/manus-storage/product-bucket-white_bbbaee2c.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 2200 },
      { label: "10L", volume: "10 Litre", price: 850 },
      { label: "4L", volume: "4 Litre", price: 390 },
      { label: "1L", volume: "1 Litre", price: 140 },
      { label: "1/2L", volume: "1/2 Litre", price: 90 },
    ],
    defaultColor: "00 A 02",
    features: ["Interior", "Economical", "Smooth Finish"],
  },
  {
    id: "gloss-enamel",
    name: "Gloss Enamel",
    category: "Decorative & Specialty",
    subcategory: "Decorative",
    description: "High-gloss solvent-based enamel for wood and metal surfaces. Delivers a durable, mirror-like finish with excellent adhesion.",
    image: "/manus-storage/gloss_enamel_713fb19a.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4500 },
      { label: "4L", volume: "4 Litre", price: 900 },
      { label: "1L", volume: "1 Litre", price: 300 },
      { label: "1/2L", volume: "1/2 Litre", price: 160 },
      { label: "1/4L", volume: "1/4 Litre", price: 90 },
    ],
    defaultColor: "08 D 25",
    features: ["High Gloss", "Wood & Metal", "Durable", "Solvent Based"],
  },
  {
    id: "gloss-texstar",
    name: "Gloss Texstar",
    category: "Decorative & Specialty",
    subcategory: "Decorative",
    description: "Premium gloss finish for interior and exterior woodwork, doors, and trim. Superior flow and leveling for a professional finish.",
    image: "/manus-storage/gloss_enamel_713fb19a.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4850 },
      { label: "4L", volume: "4 Litre", price: 1250 },
      { label: "1L", volume: "1 Litre", price: 350 },
      { label: "1/2L", volume: "1/2 Litre", price: 180 },
      { label: "1/4L", volume: "1/4 Litre", price: 100 },
    ],
    defaultColor: "00 A 01",
    features: ["Premium Gloss", "Interior/Exterior", "Excellent Flow"],
  },
  {
    id: "varnish",
    name: "Varnish",
    category: "Decorative & Specialty",
    subcategory: "Wood Finishes",
    description: "Clear protective varnish for wood surfaces. Enhances natural grain while providing UV and moisture protection.",
    image: "/manus-storage/synthetic_varnish_0091a0db.png",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 6000 },
      { label: "4L", volume: "4 Litre", price: 1300 },
      { label: "1L", volume: "1 Litre", price: 360 },
      { label: "1/2L", volume: "1/2 Litre", price: 180 },
      { label: "1/4L", volume: "1/4 Litre", price: 95 },
    ],
    defaultColor: "10 B 25",
    features: ["Clear Coat", "UV Protection", "Wood Protection"],
    badge: "Popular",
  },
  {
    id: "silver-aluminium",
    name: "Silver Aluminium",
    category: "Decorative & Specialty",
    subcategory: "Decorative",
    description: "Metallic silver aluminium paint for decorative and protective coating on metal surfaces. Heat reflective and corrosion resistant.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 6800 },
      { label: "4L", volume: "4 Litre", price: 1650 },
      { label: "1L", volume: "1 Litre", price: 480 },
      { label: "1/2L", volume: "1/2 Litre", price: 280 },
      { label: "1/4L", volume: "1/4 Litre", price: 180 },
    ],
    defaultColor: "00 A 13",
    features: ["Metallic", "Heat Reflective", "Corrosion Resistant"],
  },
  {
    id: "roof-floor-paint",
    name: "Roof Paints / Floor Paints",
    category: "Decorative & Specialty",
    subcategory: "Exterior",
    description: "Versatile coating for roofs and floors. Provides waterproofing, UV resistance, and durable protection against weathering.",
    image: "/manus-storage/product-bucket-roof_35f3cf0b.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4700 },
      { label: "4L", volume: "4 Litre", price: 1150 },
      { label: "1L", volume: "1 Litre", price: 380 },
      { label: "1/2L", volume: "1/2 Litre", price: 220 },
    ],
    defaultColor: "08 D 21",
    features: ["Waterproofing", "UV Resistant", "Roof & Floor"],
  },
  {
    id: "polyurethane-clear",
    name: "Polyurethane Clear",
    category: "Decorative & Specialty",
    subcategory: "Wood Finishes",
    description: "Two-component polyurethane clear coat for superior wood protection. Provides exceptional scratch and chemical resistance.",
    image: "/manus-storage/product-bucket-wood_797fac2f.jpg",
    sizes: [
      { label: "4L", volume: "4 Litre", price: 2200 },
      { label: "1L", volume: "1 Litre", price: 520 },
      { label: "1/2L", volume: "1/2 Litre", price: 300 },
    ],
    defaultColor: "00 A 01",
    features: ["2-Pack PU", "Scratch Resistant", "Chemical Resistant"],
  },
  {
    id: "nc-wood-finish",
    name: "NC Wood Finish (Cherry, Peach)",
    category: "Decorative & Specialty",
    subcategory: "Wood Finishes",
    description: "Nitrocellulose-based wood finish in Cherry and Peach tones. Quick drying with excellent grain enhancement for furniture and joinery.",
    image: "/manus-storage/product-bucket-wood_797fac2f.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 10000 },
      { label: "4L", volume: "4 Litre", price: 2400 },
      { label: "1L", volume: "1 Litre", price: 650 },
      { label: "1/2L", volume: "1/2 Litre", price: 400 },
      { label: "1/4L", volume: "1/4 Litre", price: 200 },
    ],
    defaultColor: "10 B 33",
    features: ["NC Based", "Quick Dry", "Cherry & Peach"],
  },
  {
    id: "concrete-sealer",
    name: "Concrete Sealer",
    category: "Decorative & Specialty",
    subcategory: "Industrial",
    description: "Penetrating concrete sealer that protects against moisture, dust, and chemical attack. Ideal for floors, walls, and structural concrete.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 5000 },
      { label: "4L", volume: "4 Litre", price: 1400 },
      { label: "1L", volume: "1 Litre", price: 420 },
    ],
    defaultColor: "00 A 01",
    features: ["Penetrating", "Moisture Barrier", "Concrete Protection"],
  },
  {
    id: "crack-filler",
    name: "Apex Crack Filler",
    category: "Decorative & Specialty",
    subcategory: "Wall Finishes",
    description: "Ready-mix crack filler for interior and exterior walls. Flexible formulation bridges hairline cracks and provides a smooth painting surface.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "21kg/2kg", volume: "21kg/2kg", price: 280 },
      { label: "1kg", volume: "1 kg", price: 140 },
      { label: "1/2kg", volume: "1/2 kg", price: 90 },
    ],
    defaultColor: "00 A 02",
    features: ["Ready Mix", "Flexible", "Interior/Exterior"],
  },

  // --- SERAPHIC GLUES ---
  // NO COLOR SELECTION: These are chemical adhesives with fixed transparent/amber appearance
  {
    id: "seraphic-101",
    name: "Seraphic 101 Special in Plastics",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Specialized adhesive formulated for bonding plastic materials. Strong initial tack and permanent bond for industrial applications.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 8650 },
      { label: "5L", volume: "5 Litre", price: 1950 },
      { label: "1L", volume: "1 Litre", price: 450 },
      { label: "1/2L", volume: "1/2 Litre", price: 250 },
      { label: "1/4L", volume: "1/4 Litre", price: 150 },
    ],
    defaultColor: "00 A 01",
    features: ["Plastic Bonding", "Strong Tack", "Industrial"],
    noColorSelection: true,
  },
  {
    id: "seraphic-202",
    name: "Seraphic 202 PVC Pipe Glue",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Professional grade PVC pipe cement for plumbing and drainage systems. Creates solvent-welded joints that are watertight and permanent.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 10000 },
      { label: "1L", volume: "1 Litre", price: 630 },
      { label: "1/2L", volume: "1/2 Litre", price: 360 },
      { label: "1/4L", volume: "1/4 Litre", price: 200 },
    ],
    defaultColor: "00 A 01",
    features: ["PVC Bonding", "Watertight", "Professional"],
    noColorSelection: true,
  },
  {
    id: "seraphic-103",
    name: "Seraphic 103 Leather Glue",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Contact adhesive for leather, rubber, and fabric bonding. Used in footwear manufacturing and upholstery industries.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 8700 },
      { label: "5L", volume: "5 Litre", price: 2000 },
      { label: "1L", volume: "1 Litre", price: 440 },
      { label: "1/2L", volume: "1/2 Litre", price: 260 },
      { label: "1/4L", volume: "1/4 Litre", price: 150 },
    ],
    defaultColor: "00 A 01",
    features: ["Leather Bonding", "Contact Adhesive", "Flexible Bond"],
    noColorSelection: true,
  },
  {
    id: "seraphic-3260",
    name: "Seraphic 3260 mm",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Multi-purpose industrial adhesive for general bonding applications. Suitable for wood, metal, and composite materials.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 1600 },
    ],
    defaultColor: "00 A 01",
    features: ["Multi-Purpose", "General Bonding"],
    noColorSelection: true,
  },
  {
    id: "seraphic-915",
    name: "Seraphic 915",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "High-performance industrial adhesive for demanding bonding applications. Professional grade with extended open time.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 9500 },
      { label: "4L", volume: "4 Litre", price: 2000 },
    ],
    defaultColor: "00 A 01",
    features: ["High Performance", "Extended Open Time"],
    noColorSelection: true,
  },
  {
    id: "seraphic-professional",
    name: "Seraphic Professional",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Professional-grade contact adhesive for industrial and commercial use. Superior bonding strength for a wide range of substrates.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 8000 },
      { label: "4L", volume: "4 Litre", price: 1800 },
      { label: "1L", volume: "1 Litre", price: 450 },
      { label: "1/2L", volume: "1/2 Litre", price: 250 },
      { label: "1/4L", volume: "1/4 Litre", price: 140 },
    ],
    defaultColor: "00 A 01",
    features: ["Contact Adhesive", "Professional", "Multi-Substrate"],
    noColorSelection: true,
  },
  {
    id: "seraphic-trade",
    name: "Seraphic Trade",
    category: "Seraphic Glues",
    subcategory: "Adhesives",
    description: "Economical trade-grade adhesive for everyday bonding needs. Reliable performance at competitive pricing.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 5000 },
      { label: "1L", volume: "1 Litre", price: 210 },
      { label: "1/2L", volume: "1/2 Litre", price: 135 },
      { label: "1/4L", volume: "1/4 Litre", price: 85 },
    ],
    defaultColor: "00 A 01",
    features: ["Trade Grade", "Economical", "Reliable"],
    noColorSelection: true,
  },

  // --- INDUSTRIAL & HEAVY DUTY RANGE ---
  {
    id: "2pack-epoxy",
    name: "2-Pack Epoxy Paints (Main Colours)",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Two-component epoxy coating system for heavy-duty industrial applications. Exceptional chemical resistance, adhesion, and durability on metal and concrete.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 10000 },
      { label: "4L", volume: "4 Litre", price: 2700 },
    ],
    defaultColor: "00 A 17",
    features: ["2-Pack System", "Chemical Resistant", "Heavy Duty"],
    badge: "Industrial",
  },
  {
    id: "epoxy-hardener",
    name: "Epoxy Hardener",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Catalyst hardener for 2-pack epoxy paint systems. Must be used in correct ratio with epoxy base for proper curing.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 700 },
    ],
    defaultColor: "00 A 01",
    features: ["Epoxy Catalyst", "2-Pack Component"],
  },
  {
    id: "qad-black",
    name: "QAD Black / Matt Black",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Quality anti-corrosive paint for steel structures and machinery. Available in gloss black and matte black finishes.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 14500 },
      { label: "4L", volume: "4 Litre", price: 2700 },
      { label: "1L", volume: "1 Litre", price: 650 },
    ],
    defaultColor: "00 A 25",
    features: ["Anti-Corrosive", "Steel Protection", "Gloss/Matte"],
  },
  {
    id: "qad-aluminium",
    name: "QAD Aluminium",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Aluminium-containing anti-corrosive primer/paint for metal surfaces. Provides barrier protection against rust and weathering.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "4L", volume: "4 Litre", price: 2700 },
      { label: "1L", volume: "1 Litre", price: 450 },
    ],
    defaultColor: "00 A 13",
    features: ["Aluminium Primer", "Rust Protection", "Barrier Coat"],
  },
  {
    id: "chlorinated-rubber",
    name: "Chlorinated Rubber Paints",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Chemical-resistant chlorinated rubber coating for industrial environments. Suitable for metal structures exposed to harsh conditions.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 6800 },
      { label: "4L", volume: "4 Litre", price: 1400 },
      { label: "1L", volume: "1 Litre", price: 600 },
    ],
    defaultColor: "00 A 17",
    features: ["Chemical Resistant", "Industrial", "Metal Coating"],
  },
  {
    id: "bituminous-black",
    name: "Bituminous Black",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Bituminous waterproofing paint for underground structures, foundations, and metal surfaces. Excellent moisture barrier properties.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 9500 },
      { label: "4L", volume: "4 Litre", price: 3000 },
      { label: "1L", volume: "1 Litre", price: 700 },
    ],
    defaultColor: "00 A 25",
    features: ["Waterproofing", "Underground", "Bituminous"],
  },
  {
    id: "fast-dry-white-black",
    name: "Fast Dry White / Black",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Fast-drying industrial coating available in white and black. Ideal for machinery, equipment, and surfaces requiring quick turnaround.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 9500 },
      { label: "4L", volume: "4 Litre", price: 3000 },
    ],
    defaultColor: "00 A 01",
    features: ["Fast Drying", "White/Black", "Industrial"],
  },
  {
    id: "road-marking-paint",
    name: "Road Marking Paint",
    category: "Industrial & Heavy Duty",
    subcategory: "Industrial",
    description: "Specialized road marking paint with high visibility and durability. Fast drying formula for traffic line marking and parking areas.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "4L", volume: "4 Litre", price: 2200 },
      { label: "1L", volume: "1 Litre", price: 530 },
    ],
    defaultColor: "00 A 02",
    features: ["Road Marking", "High Visibility", "Fast Dry"],
  },
  {
    id: "road-marking-thinner",
    name: "Road Marking Thinner",
    category: "Industrial & Heavy Duty",
    subcategory: "Thinnners",
    description: "Specialized thinner formulated for road marking paint. Ensures proper viscosity and spray application.",
    image: "/manus-storage/product-bucket-primer_a7275955.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 8400 },
    ],
    defaultColor: "00 A 01",
    features: ["Road Marking", "Viscosity Control"],
    noColorSelection: true,
  },

  // --- THINNERS & SPIRITS ---
  // NO COLOR SELECTION: These are solvents with fixed transparent/amber liquid appearance
  {
    id: "turpentine",
    name: "Turpentine",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Natural turpentine solvent for thinning oil-based paints, varnishes, and enamels. Cleans brushes and equipment effectively.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4000 },
      { label: "5L", volume: "5 Litre", price: 1300 },
      { label: "4L", volume: "4 Litre", price: 1200 },
      { label: "1L", volume: "1 Litre", price: 300 },
      { label: "1/2L", volume: "1/2 Litre", price: 180 },
    ],
    defaultColor: "00 A 01",
    features: ["Natural", "Oil Paint Thinner", "Brush Cleaner"],
    noColorSelection: true,
  },
  {
    id: "nc-thinner",
    name: "NC Thinner",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Nitrocellulose thinner for lacquers and NC wood finishes. Controls viscosity for optimal spray application.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 7600 },
      { label: "5L", volume: "5 Litre", price: 1400 },
      { label: "1L", volume: "1 Litre", price: 380 },
      { label: "1/2L", volume: "1/2 Litre", price: 200 },
    ],
    defaultColor: "00 A 01",
    features: ["NC Lacquer", "Spray Application"],
    noColorSelection: true,
  },
  {
    id: "std-thinner",
    name: "Std Thinner",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Standard industrial thinner for general-purpose paint thinning. Compatible with most solvent-based coatings.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 5000 },
      { label: "5L", volume: "5 Litre", price: 1300 },
      { label: "1L", volume: "1 Litre", price: 270 },
      { label: "1/2L", volume: "1/2 Litre", price: 180 },
    ],
    defaultColor: "00 A 01",
    features: ["General Purpose", "Solvent Based"],
    noColorSelection: true,
  },
  {
    id: "white-spirit",
    name: "Special White Spirit",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "High-purity white spirit for thinning gloss enamels, varnishes, and cleaning. Low odour formulation for indoor use.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4200 },
      { label: "5L", volume: "5 Litre", price: 1400 },
      { label: "4L", volume: "4 Litre", price: 1250 },
      { label: "1L", volume: "1 Litre", price: 350 },
      { label: "1/2L", volume: "1/2 Litre", price: 200 },
    ],
    defaultColor: "00 A 01",
    features: ["High Purity", "Low Odour", "Indoor Safe"],
    noColorSelection: true,
  },
  {
    id: "fast-dry-thinner",
    name: "Fast Dry Thinner",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Fast-evaporating thinner for quick-drying industrial coatings. Reduces drying time significantly.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 400 },
    ],
    defaultColor: "00 A 01",
    features: ["Fast Evaporating", "Quick Dry"],
    noColorSelection: true,
  },
  {
    id: "epoxy-thinner",
    name: "Epoxy Thinner",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Specialized thinner for 2-pack epoxy systems. Controls viscosity for proper mixing ratio and application.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "1L", volume: "1 Litre", price: 430 },
    ],
    defaultColor: "00 A 01",
    features: ["Epoxy Compatible", "Viscosity Control"],
    noColorSelection: true,
  },
  {
    id: "high-gloss-thinner",
    name: "High Gloss Thinner",
    category: "Thinners & Spirits",
    subcategory: "Thinnners",
    description: "Formulated specifically for high-gloss enamel and lacquer coatings. Maintains gloss level while controlling application viscosity.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 5800 },
      { label: "1L", volume: "1 Litre", price: 400 },
      { label: "1/2L", volume: "1/2 Litre", price: 240 },
    ],
    defaultColor: "00 A 01",
    features: ["Gloss Maintenance", "Enamel Thinner"],
    noColorSelection: true,
  },

  // --- WALL FINISHES, COATINGS & PUTTY ---
  {
    id: "acrylic-emulsion",
    name: "Acrylic Emulsion (Vinyl Matt)",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Premium acrylic-based interior emulsion with vinyl matt finish. Superior coverage, washability, and color retention for walls and ceilings.",
    image: "/manus-storage/product-bucket-white_bbbaee2c.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 8600 },
      { label: "10L", volume: "10 Litre", price: 4700 },
      { label: "4L", volume: "4 Litre", price: 1900 },
      { label: "1L", volume: "1 Litre", price: 550 },
      { label: "1/2L", volume: "1/2 Litre", price: 260 },
    ],
    defaultColor: "00 A 01",
    features: ["Vinyl Matt", "Premium Coverage", "Washable"],
    badge: "Best Seller",
  },
  {
    id: "weathershield-silicon",
    name: "Weathershield (Silicon Based)",
    category: "Wall Finishes & Coatings",
    subcategory: "Exterior",
    description: "Silicon-based exterior weather shield coating. Provides superior waterproofing, UV resistance, and long-lasting color protection for external walls.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 9500 },
      { label: "10L", volume: "10 Litre", price: 5000 },
      { label: "4L", volume: "4 Litre", price: 2100 },
      { label: "1L", volume: "1 Litre", price: 650 },
      { label: "1/2L", volume: "1/2 Litre", price: 350 },
    ],
    defaultColor: "00 A 01",
    features: ["Silicon Based", "Waterproof", "UV Resistant"],
  },
  {
    id: "textured-wall-master",
    name: "Textured Wall Master / Ruff & Tuff",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Decorative textured wall coating for interior and exterior surfaces. Creates distinctive textured finishes that hide surface imperfections.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "30KG", volume: "30 KG", price: 4250 },
      { label: "20L", volume: "20 Litre", price: 4200 },
      { label: "6KG", volume: "6 KG", price: 1000 },
      { label: "4L", volume: "4 Litre", price: 2000 },
    ],
    defaultColor: "00 A 01",
    features: ["Textured", "Interior/Exterior", "Hides Imperfections"],
  },
  {
    id: "vinyl-wall-sheen",
    name: "Vinyl Wall Sheen (Silk)",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Luxurious silk-finish vinyl emulsion for interior walls. Creates an elegant soft sheen that enhances light reflection and is highly washable.",
    image: "/manus-storage/silk-vinyl-4l-skyblue_69fd3b0b.png",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 10000 },
      { label: "10L", volume: "10 Litre", price: 5500 },
      { label: "4L", volume: "4 Litre", price: 2100 },
      { label: "1L", volume: "1 Litre", price: 650 },
      { label: "1/2L", volume: "1/2 Litre", price: 350 },
    ],
    defaultColor: "00 A 02",
    features: ["Silk Sheen", "Washable", "Light Reflective"],
    badge: "Premium",
  },
  {
    id: "covermatt",
    name: "Covermatt",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Flat matt finish emulsion with excellent opacity. Ideal for ceilings and walls where a non-reflective surface is required.",
    image: "/manus-storage/product-bucket-white_bbbaee2c.jpg",
    sizes: [
      { label: "20L", volume: "20 Litre", price: 4000 },
      { label: "10L", volume: "10 Litre", price: 2300 },
      { label: "4L", volume: "4 Litre", price: 1030 },
    ],
    defaultColor: "00 A 01",
    features: ["Flat Matt", "High Opacity", "Ceiling & Walls"],
  },
  {
    id: "metal-putty",
    name: "Metal Putty",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Ready-to-use metal putty for filling cracks, holes, and surface defects on metal surfaces. Provides smooth base for painting.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "40KG", volume: "40 KG", price: 1800 },
      { label: "20L", volume: "20 Litre", price: 10500 },
      { label: "10L", volume: "10 Litre", price: 5500 },
      { label: "4L", volume: "4 Litre", price: 2250 },
      { label: "1L", volume: "1 Litre", price: 650 },
      { label: "1/2L", volume: "1/2 Litre", price: 330 },
    ],
    defaultColor: "00 A 13",
    features: ["Ready Mix", "Metal Surface", "Crack Filling"],
  },
  {
    id: "skim-coat",
    name: "Skim Coat",
    category: "Wall Finishes & Coatings",
    subcategory: "Wall Finishes",
    description: "Fine finishing plaster for smooth wall preparation. Creates a perfectly flat surface ready for painting or wallpaper.",
    image: "/manus-storage/product-bucket-navy_55f1ba7d.jpg",
    sizes: [
      { label: "25KG", volume: "25 KG", price: 1200 },
    ],
    defaultColor: "00 A 02",
    features: ["Fine Finish", "Wall Preparation", "Smooth Surface"],
  },
  {
    id: "gloss-metal-bucket",
    name: "Gloss (Metal Bucket)",
    category: "Wall Finishes & Coatings",
    subcategory: "Decorative",
    description: "High-gloss paint in metal bucket packaging. Cost-effective packaging for contractors and large-scale projects.",
    image: "/manus-storage/gloss_enamel_713fb19a.jpg",
    sizes: [
      { label: "20KG", volume: "20 KG", price: 4700 },
    ],
    defaultColor: "00 A 01",
    features: ["High Gloss", "Metal Bucket", "Contractor Pack"],
  },
];

export const PRODUCT_CATEGORIES = [
  "All",
  "Decorative & Specialty",
  "Seraphic Glues",
  "Industrial & Heavy Duty",
  "Thinners & Spirits",
  "Wall Finishes & Coatings",
];

export const ROOM_SCENES = [
  {
    id: "living",
    name: "Modern Living Room",
    image: "/manus-storage/room-living_915e7a0d.jpg",
  },
  {
    id: "office",
    name: "Commercial Office",
    image: "/manus-storage/room-office_8d7e7cab.jpg",
  },
  {
    id: "exterior",
    name: "Exterior Facade",
    image: "/manus-storage/room-exterior_897ac90f.jpg",
  },
];

export const FINISHES = [
  { id: "matte", name: "Matte", description: "Flat, non-reflective finish" },
  { id: "silk", name: "Silk", description: "Soft sheen, washable" },
  { id: "eggshell", name: "Eggshell", description: "Subtle low sheen" },
  { id: "gloss", name: "Gloss", description: "High shine, durable" },
  { id: "weather-guard", name: "Weather-Guard Textured", description: "Textured, all-weather" },
];

export function formatKES(amount: number): string {
  return "KES " + amount.toLocaleString("en-KE");
}

// Helper: check if a product is a chemical product (no color selection)
export function isNoColorProduct(product: Product): boolean {
  return product.noColorSelection === true;
}
