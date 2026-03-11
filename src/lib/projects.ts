// Static project data — structured for future Sanity CMS migration.
// When Sanity is connected, replace these functions with GROQ queries.

export interface ProjectImage {
  url: string;
  alt: string;
  aspect?: "landscape" | "portrait" | "square";
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  location: string;
  year: string;
  heroImage: ProjectImage | null;
  brief: string;
  response: string[];
  gallery: ProjectImage[];
  specs: Record<string, string>;
}

const projects: Project[] = [
  {
    slug: "salem",
    title: "Salem Office",
    type: "Office Installation — 5× Ripple Pendants",
    location: "Salem, Tamil Nadu",
    year: "2025",
    heroImage: null, // Replace with professional photography
    brief:
      "A corporate office in Salem needed a lighting solution for their main meeting area — something that felt considered and distinctive without being theatrical. The space called for warmth and rhythm across a long conference table.",
    response: [
      "We proposed five Ripple pendants in a horizontal linear formation, evenly spaced to create a continuous rhythm of diffused light across the full length of the table. Each pendant casts a soft, warm pool below while the layered form catches ambient light from every angle.",
      "The configuration was designed so each piece reads as individual up close but forms a unified visual line from across the room. The spacing was calibrated to the table dimensions — close enough to feel cohesive, far enough to let each piece breathe.",
      "This was Waves' first completed B2B installation, and it confirmed that our parametric forms work at installation scale — not just as individual objects, but as spatial systems.",
    ],
    gallery: [], // Replace with 8-12 installation photographs
    specs: {
      Configuration: "5× Ripple Pendant, horizontal linear formation",
      "Individual dimensions": "H 280mm × W 180mm per pendant",
      "Installation span": "~2.4m total linear span",
      Material: "PLA (plant-based polymer), powder-coated steel hardware",
      "Print time per piece": "19h 42m",
      "Total fabrication time": "~120 hours (printing + finishing)",
      "Project timeline": "3 weeks from brief to installation",
    },
  },
  {
    slug: "chennai-residence",
    title: "Chennai Residence",
    type: "Residential — 2× Small Pendants",
    location: "Chennai, Tamil Nadu",
    year: "2026",
    heroImage: null,
    brief:
      "A private residence in Chennai required a pair of pendant lights for a dining area — intimate, warm, and complementary to a minimal interior palette.",
    response: [
      "Two small-scale custom pendants designed to frame a dining table without overwhelming the space. The forms were adapted from the Ripple geometry but scaled down for residential proximity — you see these close, so every surface detail matters.",
      "This project is currently in progress. Photography and full case study will follow on completion.",
    ],
    gallery: [],
    specs: {
      Configuration: "2× small pendant, paired",
      Material: "PLA (plant-based polymer)",
      Status: "In progress",
    },
  },
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
