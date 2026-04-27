interface StoryFormProps {
  title: string
  description: string
  onTitleChange: (v: string) => void
  onDescriptionChange: (v: string) => void
}

export function StoryForm({ title, description, onTitleChange, onDescriptionChange }: StoryFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="story-title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="story-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. Implement login page"
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="story-description">
          Description <span className="text-gray-400 text-xs">(optional)</span>
        </label>
        <textarea
          id="story-description"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Briefly describe the story or acceptance criteria…"
          rows={3}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
        />
      </div>
    </div>
  )
}
