import {
  type Criterion,
  type CriterionRating,
  type EstimationResult,
  type ScaleConfig,
  LEVEL_SP_MAP,
  numericScaleValue,
} from '../types'

/**
 * Computes a weighted SP score and ceiling-maps it to the nearest
 * higher value on the configured scale.
 *
 * Algorithm:
 *   1. contrib_i = LEVEL_SP_MAP[level_i] × weight_i
 *   2. weightedScore = Σ contrib_i
 *   3. suggestedValue = first scale value whose numeric representation ≥ weightedScore
 *      (if none, use the maximum scale value)
 */
export function computeEstimation(
  criteria: Criterion[],
  ratings: CriterionRating[],
  scale: ScaleConfig,
): EstimationResult {
  const ratingMap = new Map(ratings.map((r) => [r.criterionId, r.selectedLevel]))

  let weightedScore = 0
  const breakdown = criteria.map((criterion) => {
    const selectedLevel = ratingMap.get(criterion.id) ?? 1
    const spValue = LEVEL_SP_MAP[selectedLevel] ?? 1
    const contribution = spValue * criterion.weight
    weightedScore += contribution
    return {
      criterionId: criterion.id,
      label: criterion.label,
      selectedLevel,
      spValue,
      contribution,
    }
  })

  const suggestedValue = ceilMapToScale(weightedScore, scale.values)

  return { weightedScore, suggestedValue, breakdown }
}

/** Returns the first scale value whose numeric equivalent is ≥ score.
 *  Falls back to the largest scale value if all are smaller. */
function ceilMapToScale(score: number, values: (number | string)[]): number | string {
  const sorted = [...values].sort(
    (a, b) => numericScaleValue(a) - numericScaleValue(b),
  )
  const found = sorted.find((v) => numericScaleValue(v) >= score)
  return found ?? sorted[sorted.length - 1]
}
