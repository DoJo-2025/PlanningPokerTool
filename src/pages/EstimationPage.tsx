import { useEffect } from 'react'
import { TypeSelector } from '../components/story/TypeSelector'
import { CriteriaPanel } from '../components/criteria/CriteriaPanel'
import { ResultPanel } from '../components/result/ResultPanel'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { computeEstimation } from '../engine/suggestionEngine'

export function EstimationPage() {
  const {
    itemType, ratings, result,
    setItemType, setRating, setResult, reset,
  } = useSessionStore()

  const { storyScale, epicScale, storyCriteria, epicCriteria } = useSettingsStore()
  const criteria = itemType === 'story' ? storyCriteria : epicCriteria
  const scale = itemType === 'story' ? storyScale : epicScale

  // Recompute suggestion whenever ratings change
  useEffect(() => {
    if (ratings.length === 0) return
    const computed = computeEstimation(criteria, ratings, scale)
    setResult(computed)
  }, [ratings, criteria, scale, setResult])

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto px-6 py-8">
      {/* Type selector – top */}
      <div className="flex items-center justify-between">
        <TypeSelector value={itemType} onChange={setItemType} />
        <button
          type="button"
          onClick={reset}
          disabled={ratings.length === 0}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 5H8.354l-.354-.354-1.5-1.5A1.5 1.5 0 0 0 5.44 2.75L5.379 2.72A1.494 1.494 0 0 0 4.94 2H3.5Z" clipRule="evenodd" />
          </svg>
          Reset
        </button>
      </div>

      {/* Criteria matrix */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Complexity criteria
        </h2>
        <CriteriaPanel
          criteria={criteria}
          ratings={ratings}
          scale={scale}
          showWarnings={itemType === 'story'}
          onRate={(criterionId, level) => setRating({ criterionId, selectedLevel: level })}
        />
      </section>

      {/* Suggestion – below criteria */}
      <section className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Suggestion
        </h2>
        <ResultPanel result={result} />
      </section>
    </div>
  )
}
