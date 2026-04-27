import { type EstimationResult, type ScaleConfig } from '../../types'
import { Badge } from '../ui/Badge'

interface ResultPanelProps {
  result: EstimationResult | null
  scale: ScaleConfig
  onAccept: () => void
  onOverride: (value: number | string) => void
}

export function ResultPanel({ result, scale, onAccept, onOverride }: ResultPanelProps) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-48 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 text-sm">
        Rate all criteria to see a suggestion
      </div>
    )
  }

  const displayValue = result.finalValue ?? result.suggestedValue
  const isOverridden = result.finalValue !== undefined

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      {/* Suggested value */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          {isOverridden ? 'Your Estimate' : 'Suggested Story Points'}
        </p>
        <Badge value={displayValue} size="lg" variant={isOverridden ? 'override' : 'suggestion'} />
        {!isOverridden && (
          <button
            type="button"
            onClick={onAccept}
            className="mt-1 rounded-lg bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
          >
            Accept suggestion
          </button>
        )}
      </div>

      {/* Breakdown */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Breakdown</p>
        {result.breakdown.map((b) => (
          <div key={b.criterionId} className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">{b.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-xs">Lvl {b.selectedLevel} → {b.spValue} SP</span>
              <span className="font-medium text-gray-800 dark:text-gray-100">
                +{b.contribution.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between text-sm font-semibold">
          <span className="text-gray-600 dark:text-gray-300">Weighted total</span>
          <span>{result.weightedScore.toFixed(2)} SP</span>
        </div>
      </div>

      {/* Manual override */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Override</p>
        <div className="flex flex-wrap gap-2">
          {scale.values.map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => onOverride(v)}
              className={[
                'rounded-lg border-2 px-3 py-1 text-sm font-semibold transition-all',
                result.finalValue === v
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                  : result.suggestedValue === v && !result.finalValue
                  ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-300',
              ].join(' ')}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
