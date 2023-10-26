import type { Meta, StoryObj } from '@storybook/react';

import { V2 } from './grid';

const meta = {
  title: 'Example/V2',
  component: V2,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof V2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {};
