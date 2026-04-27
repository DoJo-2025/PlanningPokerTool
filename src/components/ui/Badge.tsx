interface BadgeProps {
  value: number | string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'suggestion' | 'override' | 'neutral'
}

export function Badge({ value, size = 'md', variant = 'neutral' }: BadgeProps) {
  const sizeClass = {
    sm: 'text-sm px-2 py-0.5',
    md: 'text-lg px-3 py-1',
    lg: 'text-3xl px-5 py-2 font-extrabold',
  }[size]

  const variantClass = {
    suggestion: 'bg-brand-100 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300 ring-2 ring-brand-400',
    override: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 ring-2 ring-emerald-400',
    neutral: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200',
  }[variant]

  return (
    <span className={`inline-flex items-center justify-center rounded-full font-bold ${sizeClass} ${variantClass}`}>
      {value}
    </span>
  )
}
