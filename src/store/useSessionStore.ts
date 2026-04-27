import { create } from 'zustand'
import { type ItemType, type CriterionRating, type EstimationResult } from '../types'

interface SessionState {
  itemType: ItemType
  title: string
  description: string
  ratings: CriterionRating[]
  result: EstimationResult | null

  setItemType: (t: ItemType) => void
  setTitle: (t: string) => void
  setDescription: (d: string) => void
  setRating: (rating: CriterionRating) => void
  setResult: (result: EstimationResult) => void
  setFinalValue: (value: number | string) => void
  reset: () => void
}

const defaultState = {
  itemType: 'story' as ItemType,
  title: '',
  description: '',
  ratings: [] as CriterionRating[],
  result: null,
}

export const useSessionStore = create<SessionState>()((set) => ({
  ...defaultState,

  setItemType: (itemType) => set({ itemType, ratings: [], result: null }),
  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),

  setRating: (rating) =>
    set((s) => {
      const existing = s.ratings.findIndex((r) => r.criterionId === rating.criterionId)
      const ratings =
        existing >= 0
          ? s.ratings.map((r, i) => (i === existing ? rating : r))
          : [...s.ratings, rating]
      return { ratings }
    }),

  setResult: (result) => set({ result }),

  setFinalValue: (value) =>
    set((s) =>
      s.result ? { result: { ...s.result, finalValue: value } } : {},
    ),

  reset: () => set(defaultState),
}))
