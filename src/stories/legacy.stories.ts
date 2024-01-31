import type { Meta, StoryObj } from '@storybook/react';

import { Page } from './legacy';

const meta = {
  title: 'Example/Legacy',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {};

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing