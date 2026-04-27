import { type ItemType } from '../../types'

interface TypeSelectorProps {
  value: ItemType
  onChange: (t: ItemType) => void
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="inline-flex rounded-xl bg-gray-100 dark:bg-gray-800/60 p-1 gap-1" role="group" aria-label="Item type">
      {(['story', 'epic'] as ItemType[]).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          aria-pressed={value === type}
          className={[
            'capitalize rounded-lg px-6 py-2.5 text-sm font-semibold transition-all duration-200',
            value === type
              ? 'bg-white dark:bg-gray-700 text-brand-600 dark:text-brand-400 shadow-sm'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200',
          ].join(' ')}
        >
          {type === 'story' ? '📋 Story' : '🏔️ Epic'}
        </button>
      ))}
    </div>
  )
}
