interface LevelCardProps {
  level: number
  description: string
  selected: boolean
  onClick: () => void
}

export function LevelCard({ level, description, selected, onClick }: LevelCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex flex-col items-start gap-1 rounded-xl border-2 p-3 text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        selected
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/30 shadow-md'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-brand-300 dark:hover:border-brand-600',
      ].join(' ')}
    >
      <span
        className={[
          'text-xs font-bold uppercase tracking-widest',
          selected ? 'text-brand-600 dark:text-brand-400' : 'text-gray-400 dark:text-gray-500',
        ].join(' ')}
      >
        Level {level}
      </span>
      <span className="text-sm text-gray-700 dark:text-gray-200 leading-snug">{description}</span>
    </button>
  )
}
