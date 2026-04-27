import { type EstimationResult } from '../../types'

interface ResultPanelProps {
  result: EstimationResult | null
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

      {/* Badge – right side, fixed size */}
      <div className="ml-6 flex-shrink-0">
        <span className="inline-flex items-center justify-center w-16 h-16 rounded-full font-extrabold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 ring-4 ring-brand-400 text-3xl">
          {displayValue}
        </span>
      </div>
    </div>
  )
}
