import type { Meta, StoryObj } from '@storybook/react'
import { LevelCard } from './LevelCard'

const meta: Meta<typeof LevelCard> = {
  title: 'UI/LevelCard',
  component: LevelCard,
  tags: ['autodocs'],
  args: {
    level: 3,
    description: 'New component, clear requirements',
    selected: false,
    onClick: () => {},
  },
}
export default meta
type Story = StoryObj<typeof LevelCard>

export const Default: Story = {}
export const Selected: Story = { args: { selected: true } }
export const Level1: Story = { args: { level: 1, description: 'Standard CRUD, no special requirements' } }
export const Level6: Story = { args: { level: 6, description: 'Architectural decision, fully unknown territory', selected: true } }
