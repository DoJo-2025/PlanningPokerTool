import { type Criterion } from '../../types'
import { LevelCard } from '../ui/LevelCard'

interface CriterionLevelSelectorProps {
  criterion: Criterion
  selectedLevel: number | undefined
  onSelect: (level: number) => void
}

export function CriterionLevelSelector({ criterion, selectedLevel, onSelect }: CriterionLevelSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
          {criterion.label}
        </h3>
        <span className="text-xs text-gray-400">weight: {Math.round(criterion.weight * 100)}%</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {criterion.levels.map((l) => (
          <LevelCard
            key={l.level}
            level={l.level}
            description={l.description}
            selected={selectedLevel === l.level}
            onClick={() => onSelect(l.level)}
          />
        ))}
      </div>
    </div>
  )
}
