import { type EstimationResult, numericScaleValue } from '../../types'

interface ResultPanelProps {
  result: EstimationResult | null
}

// Same color progression as CriteriaPanel columns: green → blue → amber → red
function getBadgeColors(score: number): { bg: string; ring: string } {
  if (score <= 2) return { bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300', ring: 'ring-emerald-300 dark:ring-emerald-700' }
  if (score <= 5) return { bg: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300', ring: 'ring-brand-300 dark:ring-brand-700' }
  if (score <= 8) return { bg: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300', ring: 'ring-amber-300 dark:ring-amber-700' }
  return { bg: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300', ring: 'ring-red-300 dark:ring-red-700' }
}

function getContributionColor(level: number): string {
  if (level <= 2) return 'text-emerald-600 dark:text-emerald-400'
  if (level <= 4) return 'text-brand-600 dark:text-brand-400'
  if (level <= 5) return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}

export function ResultPanel({ result }: ResultPanelProps) {
  if (!result) {
    return (
      <div className="h-24 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700/60 text-gray-400 dark:text-gray-500 text-sm animate-fade-in">
        <span className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          Rate all criteria to see a suggestion
        </span>
      </div>
    )
  }

  const displayValue = result.finalValue ?? result.suggestedValue
  const numericValue = numericScaleValue(displayValue)
  const colors = getBadgeColors(numericValue)

  return (
    <div className="h-24 flex items-center rounded-2xl border border-gray-200/60 dark:border-gray-700/60 bg-white dark:bg-gray-800/80 px-6 shadow-sm animate-slide-up">
      {/* Breakdown – left side: compact pills */}
      <div className="flex-1 flex flex-wrap items-center gap-2">
        {result.breakdown.map((entry) => (
          <span
            key={entry.criterionId}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-50 dark:bg-gray-700/50 px-2.5 py-1 text-xs"
          >
            <span className="font-medium text-gray-700 dark:text-gray-300 truncate max-w-[100px]">{entry.label}</span>
            <span className={`font-bold ${getContributionColor(entry.selectedLevel)}`}>
              {entry.contribution.toFixed(1)}
            </span>
          </span>
        ))}
        <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
          Σ {result.weightedScore.toFixed(1)}
        </span>
      </div>

      {/* Badge – right side, fixed size, color matches complexity level */}
      <div className="ml-5 flex-shrink-0">
        <span className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl font-extrabold ring-2 text-2xl animate-scale-in ${colors.bg} ${colors.ring}`}>
          {displayValue}
        </span>
      </div>
    </div>
  )
}
