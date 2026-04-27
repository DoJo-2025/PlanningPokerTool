import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { useState } from 'react'
import { CriteriaConfig } from './CriteriaConfig'
import { DEFAULT_STORY_CRITERIA, DEFAULT_EPIC_CRITERIA, type Criterion } from '../../types'

function Controlled({ initial }: { initial: Criterion[] }) {
  const [criteria, setCriteria] = useState<Criterion[]>(initial)
  return (
    <CriteriaConfig
      itemType="story"
      criteria={criteria}
      onAdd={(c) => setCriteria((prev) => [...prev, c])}
      onRemove={(id) => setCriteria((prev) => prev.filter((c) => c.id !== id))}
      onUpdateLabel={(id, label) =>
        setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, label } : c)))
      }
      onUpdateWeight={(id, weight) =>
        setCriteria((prev) => prev.map((c) => (c.id === id ? { ...c, weight } : c)))
      }
      onUpdateLevelDescription={(criterionId, level, description) =>
        setCriteria((prev) =>
          prev.map((c) =>
            c.id === criterionId
              ? { ...c, levels: c.levels.map((l) => (l.level === level ? { ...l, description } : l)) }
              : c,
          ),
        )
      }
    />
  )
}

const meta: Meta<typeof CriteriaConfig> = {
  title: 'Settings/CriteriaConfig',
  component: CriteriaConfig,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof CriteriaConfig>

export const StoryCatalogue: Story = {
  render: () => <Controlled initial={DEFAULT_STORY_CRITERIA} />,
}

export const EpicCatalogue: Story = {
  render: () => <Controlled initial={DEFAULT_EPIC_CRITERIA} />,
}

export const AddCriterion: Story = {
  render: () => <Controlled initial={DEFAULT_STORY_CRITERIA} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const addBtn = await canvas.findByText(/\+ Add criterion/i)
    const countBefore = canvas.getAllByRole('textbox').length
    await userEvent.click(addBtn)
    const countAfter = canvas.getAllByRole('textbox').length
    expect(countAfter).toBeGreaterThan(countBefore)
  },
}

export const EditLevelDescription: Story = {
  render: () => <Controlled initial={DEFAULT_STORY_CRITERIA} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Expand the first criterion's levels
    const editBtns = await canvas.findAllByText(/Edit levels/i)
    await userEvent.click(editBtns[0])
    // Find the first level description input and change it
    const levelInputs = canvas.getAllByRole('textbox')
    const descInput = levelInputs.find((el) =>
      (el as HTMLInputElement).value === 'Standard CRUD, no special requirements',
    ) as HTMLInputElement
    await userEvent.clear(descInput)
    await userEvent.type(descInput, 'Updated level 1 description')
    expect(descInput.value).toBe('Updated level 1 description')
  },
}
