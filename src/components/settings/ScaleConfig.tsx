import { useState } from 'react'
import { type ScaleConfig, type ScalePreset, SCALE_PRESETS } from '../../types'

interface ScaleConfigProps {
  scale: ScaleConfig
  onChange: (scale: ScaleConfig) => void
}

const PRESET_LABELS: Record<Exclude<ScalePreset, 'custom'>, string> = {
  fibonacci: 'Fibonacci',
  'modified-fibonacci': 'Modified Fibonacci',
  tshirt: 'T-Shirt Sizes',
}

export function ScaleConfigPanel({ scale, onChange }: ScaleConfigProps) {
  const [customInput, setCustomInput] = useState(
    scale.preset === 'custom' ? scale.values.join(', ') : '',
  )
  const [customError, setCustomError] = useState('')

  function selectPreset(preset: Exclude<ScalePreset, 'custom'>) {
    onChange({ preset, values: SCALE_PRESETS[preset] })
  }

  function applyCustom() {
    const raw = customInput.split(',').map((s) => s.trim()).filter(Boolean)
    if (raw.length < 2) {
      setCustomError('Enter at least 2 values separated by commas.')
      return
    }
    setCustomError('')
    const values = raw.map((v) => (isNaN(Number(v)) ? v : Number(v)))
    onChange({ preset: 'custom', values })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {(Object.keys(PRESET_LABELS) as Exclude<ScalePreset, 'custom'>[]).map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => selectPreset(preset)}
            className={[
              'rounded-lg border-2 px-4 py-1.5 text-sm font-medium transition-all',
              scale.preset === preset
                ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-brand-300',
            ].join(' ')}
          >
            {PRESET_LABELS[preset]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Custom scale (comma-separated)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="e.g. 1, 2, 4, 8, 16"
            className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="button"
            onClick={applyCustom}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
          >
            Apply
          </button>
        </div>
        {customError && <p className="text-xs text-red-500">{customError}</p>}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Active scale:</span>
        {scale.values.map((v) => (
          <span
            key={String(v)}
            className="rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:text-gray-300"
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  )
}
