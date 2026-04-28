import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { useState } from 'react'
import { CriteriaPanel } from './CriteriaPanel'
import { DEFAULT_STORY_CRITERIA, type CriterionRating, SCALE_PRESETS } from '../../types'

function Controlled() {
  const [ratings, setRatings] = useState<CriterionRating[]>([])
  return (
    <CriteriaPanel
      criteria={DEFAULT_STORY_CRITERIA}
      ratings={ratings}
      scale={{ preset: 'fibonacci', values: SCALE_PRESETS.fibonacci }}
      onRate={(criterionId, selectedLevel) =>
        setRatings((prev) => {
          const next = prev.filter((r) => r.criterionId !== criterionId)
          return [...next, { criterionId, selectedLevel }]
        })
      }
    />
  )
}

const meta: Meta<typeof CriteriaPanel> = {
  title: 'Criteria/CriteriaPanel',
  component: CriteriaPanel,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CriteriaPanel>

export const StoryType: Story = {
  render: () => <Controlled />,
}

export const SelectLevel3OnFirstCriterion: Story = {
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click das dritte Level des ersten Kriteriums ("New component, clear requirements")
    const level3Buttons = await canvas.findAllByText(/New component, clear requirements/i)
    await userEvent.click(level3Buttons[0])
    // Verify it is now selected (aria-pressed=true)
    expect(level3Buttons[0].closest('button')).toHaveAttribute('aria-pressed', 'true')
  },
}
