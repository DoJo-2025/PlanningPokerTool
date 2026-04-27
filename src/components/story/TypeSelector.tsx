import { type ItemType } from '../../types'

interface TypeSelectorProps {
  value: ItemType
  onChange: (t: ItemType) => void
}

export function TypeSelector({ value, onChange }: TypeSelectorProps) {
  return (
    <div className="flex gap-2" role="group" aria-label="Item type">
      {(['story', 'epic'] as ItemType[]).map((type) => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          aria-pressed={value === type}
          className={[
            'capitalize rounded-lg px-5 py-2 text-sm font-semibold border-2 transition-all',
            value === type
              ? 'bg-brand-600 text-white border-brand-600 shadow'
              : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-brand-400',
          ].join(' ')}
        >
          {type}
        </button>
      ))}
    </div>
  )
}
