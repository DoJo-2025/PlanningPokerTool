import type { Meta, StoryObj } from '@storybook/react'
import { StoryForm } from './StoryForm'

const meta: Meta<typeof StoryForm> = {
  title: 'Story/StoryForm',
  component: StoryForm,
  tags: ['autodocs'],
  args: { onTitleChange: () => {}, onDescriptionChange: () => {} },
}
export default meta
type Story = StoryObj<typeof StoryForm>

export const Empty: Story = { args: { title: '', description: '' } }
export const Filled: Story = {
  args: {
    title: 'Implement login page',
    description: 'User can sign in with email and password. Include form validation.',
  },
}
