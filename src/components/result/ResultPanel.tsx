import { type EstimationResult, numericScaleValue } from '../../types'

interface ResultPanelProps {
  result: EstimationResult | null
}

// Same color progression as CriteriaPanel columns: green → blue → amber → red
function getBadgeColors(score: number): string {
  if (score <= 2) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 ring-emerald-400'
  if (score <= 5) return 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 ring-brand-400'
  if (score <= 8) return 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 ring-amber-400'
  return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 ring-red-400'
}

export function ResultPanel({ result }: ResultPanelProps) {
  if (!result) {
    return (
      <div className="h-28 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 text-sm">
        Rate all criteria to see a suggestion
      </div>
    )
  }

  const displayValue = result.finalValue ?? result.suggestedValue
  const numericValue = numericScaleValue(displayValue)
  const badgeColors = getBadgeColors(numericValue)

  return (
    <div className="h-28 flex items-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 shadow-sm">
      {/* Breakdown – left side */}
      <div className="flex-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
        {result.breakdown.map((entry) => (
          <span key={entry.criterionId} className="whitespace-nowrap">
            <span className="font-medium text-gray-700 dark:text-gray-300">{entry.label}</span>{' '}
            <span className="text-gray-400">Lvl {entry.selectedLevel}</span>{' '}
            <span className="font-semibold text-brand-600 dark:text-brand-400">
              ×{(entry.contribution).toFixed(1)}
            </span>
          </span>
        ))}
        <span className="whitespace-nowrap border-l border-gray-200 dark:border-gray-600 pl-4 font-medium text-gray-600 dark:text-gray-300">
          Σ {result.weightedScore.toFixed(1)}
        </span>
      </div>

      {/* Badge – right side, fixed size, color matches complexity level */}
      <div className="ml-6 flex-shrink-0">
        <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full font-extrabold ring-4 text-3xl ${badgeColors}`}>
          {displayValue}
        </span>
      </div>
    </div>
  )
}
