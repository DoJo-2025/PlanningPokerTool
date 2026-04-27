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
    setItemType, setRating, setResult, setFinalValue,
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
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
      {/* Type selector – top */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Item type</h2>
        <TypeSelector value={itemType} onChange={setItemType} />
      </div>

      {/* Main layout: Criteria (left) + Suggestion (right) */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Criteria matrix – left/full width */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400"> 
            Complexity criteria
          </h2>
          <CriteriaPanel
            criteria={criteria}
            ratings={ratings}
            scale={scale}
            onRate={(criterionId, level) => setRating({ criterionId, selectedLevel: level })}
          />
        </div>

        {/* Result panel – right side */}
        <div className="w-full lg:w-96 flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            Suggestion
          </h2>
          <ResultPanel
            result={result}
            scale={scale}
            onAccept={() => result && setFinalValue(result.suggestedValue)}
            onOverride={(v) => setFinalValue(v)}
          />
        </div>
      </div>
    </div>
  )
}
