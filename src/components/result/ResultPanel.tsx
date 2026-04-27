import { type EstimationResult, type ScaleConfig } from '../../types'

interface ResultPanelProps {
  result: EstimationResult | null
  scale: ScaleConfig
}

export function ResultPanel({ result, scale }: ResultPanelProps) {
  // Helper: get unit label based on scale type
  function getUnitLabel(): string {
    if (scale.preset === 'tshirt') return ''
    if (scale.preset === 'custom') return ''
    return 'SP'
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500 text-sm">
        Rate all criteria to see a suggestion
      </div>
    )
  }

  const displayValue = result.finalValue ?? result.suggestedValue
  const unitLabel = getUnitLabel()

  return (
    <div className="h-full flex flex-col items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
      {/* Suggested value – large and centered */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Suggested {unitLabel ? 'Story Points' : 'Estimate'}
        </p>
        <span className="inline-flex items-center justify-center rounded-full font-extrabold bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 ring-4 ring-brand-400 text-5xl px-6 py-6">
          {displayValue}
        </span>
        {unitLabel && (
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{unitLabel}</span>
        )}
      </div>
    </div>
  )
}
