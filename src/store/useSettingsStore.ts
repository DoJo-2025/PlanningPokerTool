import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  type Criterion,
  type CriterionLevel,
  type ScaleConfig,
  DEFAULT_STORY_CRITERIA,
  DEFAULT_EPIC_CRITERIA,
  SCALE_PRESETS,
} from '../types'

interface SettingsState {
  storyScale: ScaleConfig
  epicScale: ScaleConfig
  storyCriteria: Criterion[]
  epicCriteria: Criterion[]

  // Scale actions
  setStoryScale: (scale: ScaleConfig) => void
  setEpicScale: (scale: ScaleConfig) => void

  // Criteria actions (type-aware)
  addCriterion: (itemType: 'story' | 'epic', criterion: Criterion) => void
  removeCriterion: (itemType: 'story' | 'epic', id: string) => void
  updateCriterion: (
    itemType: 'story' | 'epic',
    id: string,
    patch: Partial<Pick<Criterion, 'label' | 'weight'>>,
  ) => void
  updateLevelDescription: (
    itemType: 'story' | 'epic',
    criterionId: string,
    level: number,
    description: string,
  ) => void
  resetDefaults: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      storyScale: { preset: 'fibonacci', values: SCALE_PRESETS.fibonacci },
      epicScale: { preset: 'tshirt', values: SCALE_PRESETS.tshirt },
      storyCriteria: DEFAULT_STORY_CRITERIA,
      epicCriteria: DEFAULT_EPIC_CRITERIA,

      setStoryScale: (storyScale) => set({ storyScale }),
      setEpicScale: (epicScale) => set({ epicScale }),

      addCriterion: (itemType, criterion) =>
        set((s) =>
          itemType === 'story'
            ? { storyCriteria: [...s.storyCriteria, criterion] }
            : { epicCriteria: [...s.epicCriteria, criterion] },
        ),

      removeCriterion: (itemType, id) =>
        set((s) =>
          itemType === 'story'
            ? { storyCriteria: s.storyCriteria.filter((c) => c.id !== id) }
            : { epicCriteria: s.epicCriteria.filter((c) => c.id !== id) },
        ),

      updateCriterion: (itemType, id, patch) =>
        set((s) => {
          const update = (list: Criterion[]) =>
            list.map((c) => (c.id === id ? { ...c, ...patch } : c))
          return itemType === 'story'
            ? { storyCriteria: update(s.storyCriteria) }
            : { epicCriteria: update(s.epicCriteria) }
        }),

      updateLevelDescription: (itemType, criterionId, level, description) =>
        set((s) => {
          const updateLevels = (list: Criterion[]) =>
            list.map((c) =>
              c.id === criterionId
                ? {
                    ...c,
                    levels: c.levels.map((l: CriterionLevel) =>
                      l.level === level ? { ...l, description } : l,
                    ),
                  }
                : c,
            )
          return itemType === 'story'
            ? { storyCriteria: updateLevels(s.storyCriteria) }
            : { epicCriteria: updateLevels(s.epicCriteria) }
        }),

      resetDefaults: () =>
        set({
          storyScale: { preset: 'fibonacci', values: SCALE_PRESETS.fibonacci },
          epicScale: { preset: 'tshirt', values: SCALE_PRESETS.tshirt },
          storyCriteria: DEFAULT_STORY_CRITERIA,
          epicCriteria: DEFAULT_EPIC_CRITERIA,
        }),
    }),
    { name: 'planning-poker-settings' },
  ),
)
