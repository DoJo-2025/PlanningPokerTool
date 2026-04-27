import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof Badge>

export const Suggestion: Story = { args: { value: 5, size: 'lg', variant: 'suggestion' } }
export const Override: Story = { args: { value: 8, size: 'lg', variant: 'override' } }
export const Neutral: Story = { args: { value: 13, size: 'md', variant: 'neutral' } }
export const TShirt: Story = { args: { value: 'L', size: 'lg', variant: 'suggestion' } }
