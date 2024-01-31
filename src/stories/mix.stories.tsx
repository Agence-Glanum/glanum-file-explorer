import type { Meta, StoryObj } from '@storybook/react';

import { Mix } from './mix';

const meta = {
  title: 'Example/Mix',
  component: Mix,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Mix>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
    args: {
        url: ''
    }
};
