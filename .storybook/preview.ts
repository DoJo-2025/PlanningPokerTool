import type { Preview } from '@storybook/react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f9fafb' },
        { name: 'dark', value: '#030712' },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals['backgrounds']?.value === '#030712'
      document.documentElement.classList.toggle('dark', isDark)
      return Story()
    },
  ],
}

export default preview
