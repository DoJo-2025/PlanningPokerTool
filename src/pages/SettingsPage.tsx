import { ScaleConfigPanel } from '../components/settings/ScaleConfig'
import { CriteriaConfig } from '../components/settings/CriteriaConfig'
import { useSettingsStore } from '../store/useSettingsStore'
import { type Criterion } from '../types'

export function SettingsPage() {
  const {
    storyScale, epicScale,
    storyCriteria, epicCriteria,
    setStoryScale, setEpicScale,
    addCriterion, removeCriterion, updateCriterion, updateLevelDescription,
    resetDefaults,
  } = useSettingsStore()

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button
          type="button"
          onClick={resetDefaults}
          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
        >
          Reset to defaults
        </button>
      </div>

      {/* Story scale */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200">
          Story – Point Scale
        </h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <ScaleConfigPanel scale={storyScale} onChange={setStoryScale} />
        </div>
      </section>

      {/* Epic scale */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200">
          Epic – Size Scale
        </h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <ScaleConfigPanel scale={epicScale} onChange={setEpicScale} />
        </div>
      </section>

      {/* Story criteria */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200">Story Criteria</h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <CriteriaConfig
            itemType="story"
            criteria={storyCriteria}
            onAdd={(c: Criterion) => addCriterion('story', c)}
            onRemove={(id: string) => removeCriterion('story', id)}
            onUpdateLabel={(id: string, label: string) => updateCriterion('story', id, { label })}
            onUpdateWeight={(id: string, weight: number) => updateCriterion('story', id, { weight })}
            onUpdateLevelDescription={(cId: string, level: number, desc: string) =>
              updateLevelDescription('story', cId, level, desc)
            }
          />
        </div>
      </section>

      {/* Epic criteria */}
      <section className="flex flex-col gap-3">
        <h2 className="text-base font-semibold text-gray-700 dark:text-gray-200">Epic Criteria</h2>
        <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4">
          <CriteriaConfig
            itemType="epic"
            criteria={epicCriteria}
            onAdd={(c: Criterion) => addCriterion('epic', c)}
            onRemove={(id: string) => removeCriterion('epic', id)}
            onUpdateLabel={(id: string, label: string) => updateCriterion('epic', id, { label })}
            onUpdateWeight={(id: string, weight: number) => updateCriterion('epic', id, { weight })}
            onUpdateLevelDescription={(cId: string, level: number, desc: string) =>
              updateLevelDescription('epic', cId, level, desc)
            }
          />
        </div>
      </section>
    </div>
  )
}
