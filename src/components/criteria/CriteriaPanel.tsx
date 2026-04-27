import { type Criterion, type CriterionRating, type ScaleConfig, LEVEL_SP_MAP } from '../../types'

interface CriteriaPanelProps {
  criteria: Criterion[]
  ratings: CriterionRating[]
  scale: ScaleConfig
  showWarnings?: boolean // default: true for stories, false for epics
  onRate: (criterionId: string, level: number) => void
}

const SP_WARNINGS: Record<number, string | null> = {
  1: null,
  2: null,
  3: null,
  5: null,
  8: 'Should be split',
  13: 'Must be split',
}

const COLUMN_ACCENT: Record<number, { header: string; card: string; cardSelected: string }> = {
  1: {
    header: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-emerald-100 dark:hover:shadow-none',
    cardSelected: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-emerald-200 dark:shadow-emerald-900/40',
  },
  2: {
    header: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-emerald-100 dark:hover:shadow-none',
    cardSelected: 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 shadow-emerald-200 dark:shadow-emerald-900/40',
  },
  3: {
    header: 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-brand-100 dark:hover:shadow-none',
    cardSelected: 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-brand-200 dark:shadow-brand-900/40',
  },
  4: {
    header: 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-brand-300 dark:hover:border-brand-600 hover:shadow-brand-100 dark:hover:shadow-none',
    cardSelected: 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-brand-200 dark:shadow-brand-900/40',
  },
  5: {
    header: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 hover:shadow-amber-100 dark:hover:shadow-none',
    cardSelected: 'border-amber-500 bg-amber-50 dark:bg-amber-900/30 shadow-amber-200 dark:shadow-amber-900/40',
  },
  6: {
    header: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    card: 'border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 hover:shadow-red-100 dark:hover:shadow-none',
    cardSelected: 'border-red-500 bg-red-50 dark:bg-red-900/30 shadow-red-200 dark:shadow-red-900/40',
  },
}

export function CriteriaPanel({ criteria, ratings, scale, showWarnings = true, onRate }: CriteriaPanelProps) {
  const ratingMap = new Map(ratings.map((r) => [r.criterionId, r.selectedLevel]))
  const levels = [1, 2, 3, 4, 5, 6]

  // Helper: get scale value for a level
  function getScaleValueForLevel(level: number): string | number {
    if (scale.values.length < level) return '?'
    return scale.values[level - 1]
  }

  // Helper: get unit label
  function getUnitLabel(): string {
    if (scale.preset === 'tshirt') return ''
    if (scale.preset === 'custom') return ''
    return 'SP'
  }

  return (
    <div className="w-full overflow-hidden">
      {/* Column headers */}
      <div
        className="grid gap-2 mb-3"
        style={{ gridTemplateColumns: `200px repeat(${levels.length}, minmax(0, 1fr))` }}
      >
        <div />
        {levels.map((level) => {
          const sp = LEVEL_SP_MAP[level]
          const scaleValue = getScaleValueForLevel(level)
          const unitLabel = getUnitLabel()
          const warning = showWarnings ? SP_WARNINGS[sp] : null
          const accent = COLUMN_ACCENT[level]
          return (
            <div
              key={level}
              className={`rounded-xl px-2 py-2.5 text-center font-bold ${accent.header}`}
            >
              <div className="text-lg">{scaleValue}{unitLabel && ` ${unitLabel}`}</div>
              {warning && (
                <div className="text-[10px] font-medium mt-1 leading-tight opacity-75">
                  ⚠ {warning}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Criterion rows */}
      <div className="flex flex-col gap-2.5">
        {criteria.map((criterion) => {
          const selected = ratingMap.get(criterion.id)
          return (
            <div
              key={criterion.id}
              className="grid gap-2 items-stretch animate-fade-in"
              style={{ gridTemplateColumns: `200px repeat(${levels.length}, minmax(0, 1fr))` }}
            >
              {/* Row label */}
              <div className="flex flex-col justify-center px-4 py-2.5 rounded-xl bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                  {criterion.label}
                </span>
                <span className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 font-medium">
                  {Math.round(criterion.weight * 100)}% weight
                </span>
              </div>

              {/* Level cards */}
              {criterion.levels.map((l) => {
                const isSelected = selected === l.level
                const accent = COLUMN_ACCENT[l.level]
                return (
                  <button
                    key={l.level}
                    type="button"
                    onClick={() => onRate(criterion.id, l.level)}
                    aria-pressed={isSelected}
                    className={[
                      'rounded-xl border-2 px-2.5 py-2 text-left text-[13px] leading-snug transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 cursor-pointer overflow-hidden',
                      isSelected
                        ? `${accent.cardSelected} shadow-md font-semibold text-gray-900 dark:text-gray-50`
                        : `bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 shadow-sm ${accent.card}`,
                    ].join(' ')}
                  >
                    {l.description}
                  </button>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
