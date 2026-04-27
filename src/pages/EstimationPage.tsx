import { useEffect } from 'react'
import { TypeSelector } from '../components/story/TypeSelector'
import { StoryForm } from '../components/story/StoryForm'
import { CriteriaPanel } from '../components/criteria/CriteriaPanel'
import { ResultPanel } from '../components/result/ResultPanel'
import { useSessionStore } from '../store/useSessionStore'
import { useSettingsStore } from '../store/useSettingsStore'
import { computeEstimation } from '../engine/suggestionEngine'

export function EstimationPage() {
  const {
    itemType, title, description, ratings, result,
    setItemType, setTitle, setDescription, setRating, setResult, setFinalValue,
  } = useSessionStore()

  const { scale, storyCriteria, epicCriteria } = useSettingsStore()
  const criteria = itemType === 'story' ? storyCriteria : epicCriteria

  // Recompute suggestion whenever ratings change
  useEffect(() => {
    if (ratings.length === 0) return
    const computed = computeEstimation(criteria, ratings, scale)
    setResult(computed)
  }, [ratings, criteria, scale, setResult])

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
      {/* Type selector + story details */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">Item type</h2>
          <TypeSelector value={itemType} onChange={setItemType} />
        </div>
        <div className="flex-1">
          <StoryForm
            title={title}
            description={description}
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
          />
        </div>
      </div>

      {/* Criteria matrix – full width */}
      <div className="flex flex-col gap-2">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Complexity criteria
        </h2>
        <CriteriaPanel
          criteria={criteria}
          ratings={ratings}
          onRate={(criterionId, level) => setRating({ criterionId, selectedLevel: level })}
        />
      </div>

      {/* Result panel – below the table */}
      <div className="flex flex-col gap-2">
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
  )
}
