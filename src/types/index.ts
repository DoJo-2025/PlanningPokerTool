// ── Item type ────────────────────────────────────────────────────────────────
export type ItemType = 'story' | 'epic'

// ── Scale ────────────────────────────────────────────────────────────────────
export type ScalePreset = 'fibonacci' | 'modified-fibonacci' | 'tshirt' | 'custom'

export interface ScaleConfig {
  preset: ScalePreset
  values: (number | string)[]
}

// ── Level → SP mapping (fixed, Fibonacci-based) ───────────────────────────────
export const LEVEL_SP_MAP: Record<number, number> = {
  1: 1,
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 13,
}

// ── Criteria ──────────────────────────────────────────────────────────────────
export interface CriterionLevel {
  level: number       // 1–6
  description: string // editable
}

export interface Criterion {
  id: string
  label: string
  weight: number          // 0–1; all weights in a catalogue must sum to 1
  levels: CriterionLevel[] // exactly 6 entries
}

// ── Estimation ────────────────────────────────────────────────────────────────
export interface CriterionRating {
  criterionId: string
  selectedLevel: number // 1–6
}

export interface BreakdownEntry {
  criterionId: string
  label: string
  selectedLevel: number
  spValue: number
  contribution: number // spValue * weight
}

export interface EstimationResult {
  weightedScore: number
  suggestedValue: number | string
  breakdown: BreakdownEntry[]
  finalValue?: number | string // user override
}

// ── Default scale presets ─────────────────────────────────────────────────────
export const SCALE_PRESETS: Record<Exclude<ScalePreset, 'custom'>, (number | string)[]> = {
  fibonacci: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
  'modified-fibonacci': [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100],
  tshirt: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
}

// Numeric value of a scale entry (for ceiling mapping)
export const TSHIRT_NUMERIC: Record<string, number> = {
  XS: 1,
  S: 2,
  M: 3,
  L: 5,
  XL: 8,
  XXL: 13,
}

export function numericScaleValue(v: number | string): number {
  if (typeof v === 'number') return v
  return TSHIRT_NUMERIC[v] ?? 0
}

// ── Default criteria catalogues ───────────────────────────────────────────────
function makeLevels(descriptions: string[]): CriterionLevel[] {
  return descriptions.map((description, i) => ({ level: i + 1, description }))
}

export const DEFAULT_STORY_CRITERIA: Criterion[] = [
  {
    id: 'technical-complexity',
    label: 'Technical Complexity',
    weight: 0.3,
    levels: makeLevels([
      'Standard CRUD, no special requirements',
      'Minor adjustment to existing logic',
      'New component, clear requirements',
      'Complex logic, multiple systems affected',
      'High complexity, unfamiliar technology',
      'Architectural decision, fully unknown territory',
    ]),
  },
  {
    id: 'uncertainty-risk',
    label: 'Uncertainty / Risk',
    weight: 0.3,
    levels: makeLevels([
      'Fully known, no risk',
      'Mostly known, minimal risk',
      'Some unknowns, manageable risk',
      'Several unknowns, notable risk',
      'Largely unknown, high risk',
      'Completely unknown, critical risk',
    ]),
  },
  {
    id: 'effort-size',
    label: 'Effort / Size',
    weight: 0.3,
    levels: makeLevels([
      'Trivial change (< 1 hour)',
      'Small task (half a day)',
      'Medium task (1–2 days)',
      'Large task (3–5 days)',
      'Very large task (1–2 weeks)',
      'Months of work across teams',
    ]),
  },
  {
    id: 'dependencies',
    label: 'Dependencies',
    weight: 0.1,
    levels: makeLevels([
      'No dependencies',
      'One internal dependency',
      'A few internal dependencies',
      'Several dependencies, mostly known',
      'Many dependencies, some external',
      'Many external / third-party dependencies',
    ]),
  },
]

export const DEFAULT_EPIC_CRITERIA: Criterion[] = [
  {
    id: 'business-value',
    label: 'Business Value / Impact',
    weight: 0.25,
    levels: makeLevels([
      'No measurable business impact',
      'Minor improvement',
      'Moderate value for a small user group',
      'Significant value for a broader audience',
      'High strategic importance',
      'Critical business differentiator',
    ]),
  },
  {
    id: 'epic-technical-complexity',
    label: 'Technical Complexity',
    weight: 0.25,
    levels: makeLevels([
      'Standard patterns, no new tech',
      'Minor new patterns',
      'Some new architecture needed',
      'Significant new architecture',
      'Complex cross-system architecture',
      'Fully new technology stack',
    ]),
  },
  {
    id: 'epic-uncertainty',
    label: 'Uncertainty / Risk',
    weight: 0.2,
    levels: makeLevels([
      'Fully known domain',
      'Mostly known',
      'Some unknowns',
      'Notable unknowns',
      'High uncertainty',
      'Completely uncharted territory',
    ]),
  },
  {
    id: 'sub-stories',
    label: 'Number of Sub-Stories',
    weight: 0.15,
    levels: makeLevels([
      '1–2 stories',
      '3–4 stories',
      '5–7 stories',
      '8–12 stories',
      '13–20 stories',
      '20+ stories',
    ]),
  },
  {
    id: 'external-dependencies',
    label: 'External Dependencies',
    weight: 0.15,
    levels: makeLevels([
      'No external dependencies',
      'One minor external dependency',
      'A couple of external dependencies',
      'Several external dependencies',
      'Many external systems involved',
      'Relies heavily on uncontrolled external systems',
    ]),
  },
]
