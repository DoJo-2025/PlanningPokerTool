import type { Meta, StoryObj } from '@storybook/react'
import { TypeSelector } from './TypeSelector'

const meta: Meta<typeof TypeSelector> = {
  title: 'Story/TypeSelector',
  component: TypeSelector,
  tags: ['autodocs'],
  args: { onChange: () => {} },
}
export default meta
type Story = StoryObj<typeof TypeSelector>

export const StorySelected: Story = { args: { value: 'story' } }
export const EpicSelected: Story = { args: { value: 'epic' } }
