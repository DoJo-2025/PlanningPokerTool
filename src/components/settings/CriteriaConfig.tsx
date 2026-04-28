import { useState } from 'react'
import { type Criterion, type ItemType } from '../../types'
import { nanoid } from '../../utils/nanoid'

interface CriteriaConfigProps {
  itemType: ItemType
  criteria: Criterion[]
  onAdd: (criterion: Criterion) => void
  onRemove: (id: string) => void
  onUpdateLabel: (id: string, label: string) => void
  onUpdateWeight: (id: string, weight: number) => void
  onUpdateLevelDescription: (criterionId: string, level: number, description: string) => void
}

export function CriteriaConfig({
  itemType,
  criteria,
  onAdd,
  onRemove,
  onUpdateLabel,
  onUpdateWeight,
  onUpdateLevelDescription,
}: CriteriaConfigProps) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const totalWeight = criteria.reduce((s, c) => s + c.weight, 0)
  const weightOk = Math.abs(totalWeight - 1) < 0.001

  function handleAdd() {
    const id = nanoid()
    onAdd({
      id,
      label: 'New Criterion',
      weight: 0,
      levels: Array.from({ length: 6 }, (_, i) => ({
        level: i + 1,
        description: `Level ${i + 1}`,
      })),
    })
    setExpanded(id)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 capitalize">
          {itemType} Criteria
        </h3>
        <span className={`text-xs font-medium ${weightOk ? 'text-emerald-800' : 'text-red-500'}`}>
          Total weight: {Math.round(totalWeight * 100)}%
          {!weightOk && ' ⚠ must be 100%'}
        </span>
      </div>

      {criteria.map((c) => (
        <div
          key={c.id}
          className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden"
        >
          {/* Header row */}
          <div className="flex items-center gap-3 px-4 py-3">
            <label htmlFor={`criterion-label-${c.id}`} className="sr-only">
              Criterion label
            </label>
            <input
              id={`criterion-label-${c.id}`}
              type="text"
              value={c.label}
              onChange={(e) => onUpdateLabel(c.id, e.target.value)}
              className="flex-1 rounded border border-gray-200 dark:border-gray-600 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
              aria-label="Criterion label"
              placeholder="Criterion label"
            />
            <div className="flex items-center gap-1">
              <label htmlFor={`criterion-weight-${c.id}`} className="sr-only">
                Criterion weight (%)
              </label>
              <input
                id={`criterion-weight-${c.id}`}
                type="number"
                min={0}
                max={100}
                step={5}
                value={Math.round(c.weight * 100)}
                onChange={(e) => onUpdateWeight(c.id, Number(e.target.value) / 100)}
                className="w-16 rounded border border-gray-200 dark:border-gray-600 bg-transparent px-2 py-1 text-sm text-center focus:outline-none focus:ring-1 focus:ring-brand-500"
                aria-label="Criterion weight in percent"
                placeholder="Weight %"
              />
              <span className="text-xs text-gray-400">%</span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
              className="text-xs text-brand-700 hover:text-brand-800 font-medium"
            >
              {expanded === c.id ? 'Collapse' : 'Edit levels'}
            </button>
            <button
              type="button"
              onClick={() => onRemove(c.id)}
              aria-label="Remove criterion"
              className="text-red-700 hover:text-red-800 transition-colors flex items-center gap-1"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="sr-only">Remove criterion</span>
            </button>
          </div>

          {/* Level descriptions */}
          {expanded === c.id && (
            <div className="border-t border-gray-100 dark:border-gray-700 px-4 py-3 flex flex-col gap-2">
              {c.levels.map((l) => (
                <div key={l.level} className="flex items-center gap-3">
                  <span className="w-12 shrink-0 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Lvl {l.level}
                  </span>
                  <label htmlFor={`criterion-${c.id}-level-${l.level}-desc`} className="sr-only">
                    Level {l.level} description
                  </label>
                  <input
                    id={`criterion-${c.id}-level-${l.level}-desc`}
                    type="text"
                    value={l.description}
                    onChange={(e) => onUpdateLevelDescription(c.id, l.level, e.target.value)}
                    className="flex-1 rounded border border-gray-200 dark:border-gray-600 bg-transparent px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-500"
                    aria-label={`Level ${l.level} description`}
                    placeholder={`Level ${l.level} description`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 py-2 text-sm text-gray-500 dark:text-gray-400 hover:border-brand-400 hover:text-brand-600 transition-colors"
      >
        + Add criterion
      </button>
    </div>
  )
}
