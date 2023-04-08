import type { Meta, StoryObj } from '@storybook/vue3';
import Room from './Room.vue';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof Room> = {
  title: 'Scuti/Room',
  component: Room,
  tags: ['autodocs'],
  argTypes: {
    tileMap: { control: 'text' },
  }
};

export default meta;
type Story = StoryObj<typeof Room>;

export const DefaultRoom: Story = {
  args: {
    tileMap: `
        xxx
        x00
        x00
    `,
  },
};

export const Stairs: Story = {
  args: {
    tileMap: `
    xxxxx
    x1100
    x1100
    x0000
    x0000
    `,
  },
};

export const StairCorners: Story = {
  args: {
    tileMap: `
    xxxxxxx
    x000000
    x000000
    x001100
    x001100
    x000000
    `,
  },
};

export const StairWalls: Story = {
  args: {
    tileMap: `
    xxxxxxxxx
    x44321000
    x44321000
    x33000000
    x22000000
    x11000000
    x00000000
    `,
  },
};


export const MultipleSubsequentStairs: Story = {
  args: {
    tileMap: `
      xxxxxx
      x22100
      x22100
      x11000
      x00000
      x00000
    `,
  },
};

export const Holes: Story = {
  args: {
    tileMap: `
      xxxxxx
      x00000
      x0x0x0
      x00x00
      x0x0x0
      x00000
    `,
  },
};

export const AngledRoom: Story = {
  args: {
    tileMap: `
      xxxxxxx
      xxxx000
      xxxx000
      xxxx000
      x000000
      x000000
      x000000
    `,
  },
};

export const Door: Story = {
  args: {
    tileMap: `
    xxxxx
    x0000
    00000
    x0000
    x0000
    `,
  },
};

export const OtherRoomShape: Story = {
  args: {
    tileMap: "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "00000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n",
  },
};