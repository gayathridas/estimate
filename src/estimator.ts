// ============================================================
// estimator.ts — Core estimation logic for the Estimate app
// All types are strictly defined; no `any` allowed.
// ============================================================

export type ComplexityLevel = 'simple' | 'medium' | 'complex';

export interface CostCategory {
  name: string;
  icon: string;
  minCost: number;
  maxCost: number;
  description: string;
}

export interface EstimateResult {
  idea: string;
  complexity: ComplexityLevel;
  categories: CostCategory[];
  totalMin: number;
  totalMax: number;
}

// Base cost multipliers per complexity level
const COMPLEXITY_MULTIPLIERS: Record<ComplexityLevel, number> = {
  simple: 0.5,
  medium: 1.0,
  complex: 2.2,
};

// Base cost categories (in USD, at "medium" complexity)
const BASE_CATEGORIES: Omit<CostCategory, 'minCost' | 'maxCost'>[] = [
  {
    name: 'UI / UX Design',
    icon: '🎨',
    description: 'Wireframing, prototyping, and visual design of all screens.',
  },
  {
    name: 'Frontend Development',
    icon: '💻',
    description: 'Implementing the user interface, interactions, and client-side logic.',
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    description: 'APIs, business logic, authentication, and server-side services.',
  },
  {
    name: 'Database & Storage',
    icon: '🗄️',
    description: 'Database schema design, setup, and cloud storage configuration.',
  },
  {
    name: 'Testing & QA',
    icon: '🧪',
    description: 'Unit, integration, and end-to-end testing across all components.',
  },
  {
    name: 'Deployment & DevOps',
    icon: '🚀',
    description: 'CI/CD pipelines, cloud hosting setup, monitoring, and scaling.',
  },
];

// Base cost ranges per category at medium complexity (USD)
const BASE_COST_RANGES: { min: number; max: number }[] = [
  { min: 2000, max: 5000 },   // UI/UX
  { min: 5000, max: 12000 },  // Frontend
  { min: 6000, max: 15000 },  // Backend
  { min: 1500, max: 4000 },   // Database
  { min: 2000, max: 5000 },   // Testing
  { min: 1000, max: 3000 },   // DevOps
];

export function generateEstimate(idea: string, complexity: ComplexityLevel): EstimateResult {
  const multiplier = COMPLEXITY_MULTIPLIERS[complexity];

  const categories: CostCategory[] = BASE_CATEGORIES.map((cat, index) => {
    const base = BASE_COST_RANGES[index];
    return {
      ...cat,
      minCost: Math.round(base.min * multiplier),
      maxCost: Math.round(base.max * multiplier),
    };
  });

  const totalMin = categories.reduce((sum, cat) => sum + cat.minCost, 0);
  const totalMax = categories.reduce((sum, cat) => sum + cat.maxCost, 0);

  return { idea, complexity, categories, totalMin, totalMax };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
