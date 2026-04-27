import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within, expect } from '@storybook/test'
import { useState } from 'react'
import { ResultPanel } from './ResultPanel'
import { type EstimationResult, SCALE_PRESETS } from '../../types'

const fibScale = { preset: 'fibonacci' as const, values: SCALE_PRESETS.fibonacci }

const mockResult: EstimationResult = {
  weightedScore: 3.1,
  suggestedValue: 5,
  breakdown: [
    { criterionId: 'tc', label: 'Technical Complexity', selectedLevel: 4, spValue: 5, contribution: 1.5 },
    { criterionId: 'ur', label: 'Uncertainty / Risk', selectedLevel: 2, spValue: 2, contribution: 0.6 },
    { criterionId: 'ef', label: 'Effort / Size', selectedLevel: 3, spValue: 3, contribution: 0.9 },
    { criterionId: 'dep', label: 'Dependencies', selectedLevel: 1, spValue: 1, contribution: 0.1 },
  ],
}

const mockResultWithOverride: EstimationResult = { ...mockResult, finalValue: 8 }

const meta: Meta<typeof ResultPanel> = {
  title: 'Result/ResultPanel',
  component: ResultPanel,
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof ResultPanel>

export const NoResult: Story = {
  args: { result: null, scale: fibScale, onAccept: () => {}, onOverride: () => {} },
}

export const WithSuggestion: Story = {
  args: { result: mockResult, scale: fibScale, onAccept: () => {}, onOverride: () => {} },
}

export const WithOverride: Story = {
  args: { result: mockResultWithOverride, scale: fibScale, onAccept: () => {}, onOverride: () => {} },
}

function Controlled() {
  const [result, setResult] = useState<EstimationResult>(mockResult)
  return (
    <ResultPanel
      result={result}
      scale={fibScale}
      onAccept={() => setResult({ ...result, finalValue: result.suggestedValue })}
      onOverride={(v) => setResult({ ...result, finalValue: v })}
    />
  )
}

export const AcceptSuggestion: Story = {
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const acceptBtn = await canvas.findByText(/Accept suggestion/i)
    await userEvent.click(acceptBtn)
    // After accepting, the button should disappear (finalValue is now set)
    expect(canvas.queryByText(/Accept suggestion/i)).toBeNull()
  },
}

export const ManualOverride: Story = {
  render: () => <Controlled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    // Click the "8" override button
    const btn8 = await canvas.findByRole('button', { name: '8' })
    await userEvent.click(btn8)
    expect(btn8).toHaveAttribute('class', expect.stringContaining('emerald'))
  },
}
