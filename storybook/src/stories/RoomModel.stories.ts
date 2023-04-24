import type { Meta, StoryObj } from '@storybook/vue3';
import Renderer from './Renderer.vue';
import { FloorMaterial, WallMaterial, type Scuti, Room } from 'scuti-renderer';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof Renderer> = {
  title: 'Scuti/Room/Model',
  component: Renderer,
  tags: ['autodocs'],
  argTypes: {
    tileMap: { control: 'text' },
  }
};

export default meta;
type Story = StoryObj<typeof Renderer>;

export const ModelA: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxx000000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxx00000000
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelB: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxx0000000
            xxxxx0000000
            xxxxx0000000
            xxxxx0000000
            000000000000
            x00000000000
            x00000000000
            x00000000000
            x00000000000
            x00000000000
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelC: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxx000000x
            xxxxx000000x
            xxxx0000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelD: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxx0000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxx000000x
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelE: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xx0000000000
            xx0000000000
            x00000000000
            xx0000000000
            xx0000000000
            xx0000000000
            xx0000000000
            xx0000000000
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelF: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxxxx0000x
            xxxxxxx0000x
            xxx00000000x
            xxx00000000x
            xx000000000x
            xxx00000000x
            x0000000000x
            x0000000000x
            x0000000000x
            x0000000000x
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelG: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxx00000
            xxxxxxx00000
            xxxxxxx00000
            xx1111000000
            xx1111000000
            x11111000000
            xx1111000000
            xx1111000000
            xxxxxxx00000
            xxxxxxx00000
            xxxxxxx00000
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelH: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxx111111x
            xxxxx111111x
            xxxx1111111x
            xxxxx111111x
            xxxxx111111x
            xxxxx000000x
            xxxxx000000x
            xxx00000000x
            xxx00000000x
            xxx00000000x
            xxx00000000x
            xxxxxxxxxxxx
            xxxxxxxxxxxx
            xxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelI: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxx
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        00000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        x0000000000000000
        xxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelJ: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxx0000000000
            xxxxxxxxxxx0000000000
            xxxxxxxxxxx0000000000
            xxxxxxxxxxx0000000000
            xxxxxxxxxxx0000000000
            xxxxxxxxxxx0000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            000000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x0000000000xxxxxxxxxx
            x0000000000xxxxxxxxxx
            x0000000000xxxxxxxxxx
            x0000000000xxxxxxxxxx
            x0000000000xxxxxxxxxx
            x0000000000xxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelK: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxx00000000
            xxxxxxxxxxxxxxxxx00000000
            xxxxxxxxxxxxxxxxx00000000
            xxxxxxxxxxxxxxxxx00000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            x000000000000000000000000
            x000000000000000000000000
            x000000000000000000000000
            x000000000000000000000000
            0000000000000000000000000
            x000000000000000000000000
            x000000000000000000000000
            x000000000000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelL: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxx
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            000000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            x00000000xxxx00000000
            xxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelM: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            x0000000000000000000000000000
            x0000000000000000000000000000
            x0000000000000000000000000000
            x0000000000000000000000000000
            00000000000000000000000000000
            x0000000000000000000000000000
            x0000000000000000000000000000
            x0000000000000000000000000000
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelN: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxx
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x000000xxxxxxxx000000
            x000000x000000x000000
            x000000x000000x000000
            x000000x000000x000000
            x000000x000000x000000
            x000000x000000x000000
            x000000x000000x000000
            x000000xxxxxxxx000000
            x00000000000000000000
            000000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            x00000000000000000000
            xxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelO: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx11111111xxxx
            xxxxxxxxxxxxx00000000xxxx
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            x111111100000000000000000
            x111111100000000000000000
            x111111100000000000000000
            1111111100000000000000000
            x111111100000000000000000
            x111111100000000000000000
            x111111100000000000000000
            x111111100000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxx0000000000000000
            xxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelP: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxx
            xxxxxxx222222222222
            xxxxxxx222222222222
            xxxxxxx222222222222
            xxxxxxx222222222222
            xxxxxxx222222222222
            xxxxxxx222222222222
            xxxxxxx22222222xxxx
            xxxxxxx11111111xxxx
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x222221111111111111
            x2222xx11111111xxxx
            x2222xx00000000xxxx
            x2222xx000000000000
            x2222xx000000000000
            x2222xx000000000000
            x2222xx000000000000
            22222xx000000000000
            x2222xx000000000000
            xxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelQ: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxx22222222
            xxxxxxxxxxx22222222
            xxxxxxxxxxx22222222
            xxxxxxxxxx222222222
            xxxxxxxxxxx22222222
            xxxxxxxxxxx22222222
            x222222222222222222
            x222222222222222222
            x222222222222222222
            x222222222222222222
            x222222222222222222
            x222222222222222222
            x2222xxxxxxxxxxxxxx
            x2222xxxxxxxxxxxxxx
            x2222211111xx000000
            x222221111110000000
            x222221111110000000
            x2222211111xx000000
            xx22xxx1111xxxxxxxx
            xx11xxx1111xxxxxxxx
            x1111xx1111xx000000
            x1111xx111110000000
            x1111xx111110000000
            x1111xx1111xx000000
            xxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelR: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxx33333333333333
            xxxxxxxxxxx33333333333333
            xxxxxxxxxxx33333333333333
            xxxxxxxxxx333333333333333
            xxxxxxxxxxx33333333333333
            xxxxxxxxxxx33333333333333
            xxxxxxx333333333333333333
            xxxxxxx333333333333333333
            xxxxxxx333333333333333333
            xxxxxxx333333333333333333
            xxxxxxx333333333333333333
            xxxxxxx333333333333333333
            x4444433333xxxxxxxxxxxxxx
            x4444433333xxxxxxxxxxxxxx
            x44444333333222xx000000xx
            x44444333333222xx000000xx
            xxx44xxxxxxxx22xx000000xx
            xxx33xxxxxxxx11xx000000xx
            xxx33322222211110000000xx
            xxx33322222211110000000xx
            xxxxxxxxxxxxxxxxx000000xx
            xxxxxxxxxxxxxxxxx000000xx
            xxxxxxxxxxxxxxxxx000000xx
            xxxxxxxxxxxxxxxxx000000xx
            xxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelT: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x222222222222222222222222222x
            x222222222222222222222222222x
            2222222222222222222222222222x
            x222222222222222222222222222x
            x2222xxxxxx222222xxxxxxx2222x
            x2222xxxxxx111111xxxxxxx2222x
            x2222xx111111111111111xx2222x
            x2222xx111111111111111xx2222x
            x2222xx11xxx1111xxxx11xx2222x
            x2222xx11xxx0000xxxx11xx2222x
            x22222111x00000000xx11xx2222x
            x22222111x00000000xx11xx2222x
            x22222111x00000000xx11xx2222x
            x22222111x00000000xx11xx2222x
            x22222111x00000000xx11xx2222x
            x22222111x00000000xx11xx2222x
            x2222xx11xxxxxxxxxxx11xx2222x
            x2222xx11xxxxxxxxxxx11xx2222x
            x2222xx111111111111111xx2222x
            x2222xx111111111111111xx2222x
            x2222xxxxxxxxxxxxxxxxxxx2222x
            x2222xxxxxxxxxxxxxxxxxxx2222x
            x222222222222222222222222222x
            x222222222222222222222222222x
            x222222222222222222222222222x
            x222222222222222222222222222x
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelU: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxx
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            11111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            x1111100000000000000000x
            xxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelV: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxx
            x222221111111111111x
            x222221111111111111x
            2222221111111111111x
            x222221111111111111x
            x222221111111111111x
            x222221111111111111x
            xxxxxxxx1111xxxxxxxx
            xxxxxxxx0000xxxxxxxx
            x000000x0000x000000x
            x000000x0000x000000x
            x00000000000x000000x
            x00000000000x000000x
            x000000000000000000x
            x000000000000000000x
            xxxxxxxx00000000000x
            x000000x00000000000x
            x000000x0000xxxxxxxx
            x00000000000x000000x
            x00000000000x000000x
            x00000000000x000000x
            x00000000000x000000x
            xxxxxxxx0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            xxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelW: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxx
            x2222xx1111111111xx11111111
            x2222xx1111111111xx11111111
            222222111111111111111111111
            x22222111111111111111111111
            x22222111111111111111111111
            x22222111111111111111111111
            x2222xx1111111111xx11111111
            x2222xx1111111111xx11111111
            x2222xx1111111111xxxx1111xx
            x2222xx1111111111xxxx0000xx
            xxxxxxx1111111111xx00000000
            xxxxxxx1111111111xx00000000
            x22222111111111111000000000
            x22222111111111111000000000
            x22222111111111111000000000
            x22222111111111111000000000
            x2222xx1111111111xx00000000
            x2222xx1111111111xx00000000
            x2222xxxx1111xxxxxxxxxxxxxx
            x2222xxxx0000xxxxxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
            x2222x0000000000xxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelX: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxx
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            xxx00xxx0000xxx00xxx
            x000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            0000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000x0000x000000x
            x000000xxxxxx000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            x000000000000000000x
            xxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelY: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000xx0000000000xx0000x
            x00000000xx0000000000xx0000x
            000000000xx0000000000xx0000x
            x00000000xx0000000000xx0000x
            x00000000xx0000xx0000xx0000x
            x00000000xx0000xx0000xx0000x
            x00000000xx0000xx0000000000x
            x00000000xx0000xx0000000000x
            xxxxx0000xx0000xx0000000000x
            xxxxx0000xx0000xx0000000000x
            xxxxx0000xx0000xxxxxxxxxxxxx
            xxxxx0000xx0000xxxxxxxxxxxxx
            x00000000xx0000000000000000x
            x00000000xx0000000000000000x
            x00000000xx0000000000000000x
            x00000000xx0000000000000000x
            x0000xxxxxxxxxxxxxxxxxx0000x
            x0000xxxxxxxxxxxxxxxxxx0000x
            x00000000000000000000000000x
            x00000000000000000000000000x
            x00000000000000000000000000x
            x00000000000000000000000000x
            xxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const ModelZ: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxx00000000000000000000
            xxxxxxxxxxx00000000000000000000
            xxxxxxxxxxx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            000000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            x00000000xx00000000000000000000
            xxxxxxxxxxx00000000000000000000
            xxxxxxxxxxx00000000000000000000
            xxxxxxxxxxx00000000000000000000
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model0: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
            000000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx0000
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000xx00000000xx00000000xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model1: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xeeeeeeeeeeeeeeeedcba9888888888888
            xeeeeeeeeeeeeeeeexxxxxx88888888888
            xeeeeeeeeeeeeeeeexxxxxx88888888888
            xeeeeeeeeeeeeeeeexxxxxx88888888888
            xeeeeeeeeeeeeeeeexxxxxx88888888888
            xdxxxxxxxxxxxxxxxxxxxxx88888888888
            xcxxxxxxxxxxxxxxxxxxxxx88888888888
            xbxxxxxxxxxxxxxxxxxxxxx88888888888
            xaxxxxxxxxxxxxxxxxxxxxx88888888888
            aaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
            xaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
            xaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx
            xaaaaaaaaaaaaaaaaxxxx6666666666666
            xaaaaaaaaaaaaaaaaxxxx6666666666666
            xaaaaaaaaaaaaaaaaxxxx6666666666666
            xaaaaaaaaaaaaaaaaxxxx6666666666666
            xaaaaaaaaaaaaaaaaxxxx6666666666666
            xaaaaaaaaaaaaaaaa98766666666666666
            xaaaaaaaaaaaaaaaaxxxxxxxxxxxx5xxxx
            xaaaaaaaaaaaaaaaaxxxxxxxxxxxx4xxxx
            xaaaaaaaaaaaaaaaaxxxxxxxxxxxx3xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xaaaaaaaaaaaaaaaaxxx3333333333xxxx
            xxxxxxxxxxxxxxxx9xxx3333333333xxxx
            xxxxxxxxxxxxxxxx8xxx3333333333xxxx
            xxxxxxxxxxxxxxxx7xxx3333333333xxxx
            xxx777777777xxxx6xxx3333333333xxxx
            xxx777777777xxxx5xxxxxxxxxxxxxxxxx
            xxx777777777xxxx4xxxxxxxxxxxxxxxxx
            xxx777777777xxxx3xxxxxxxxxxxxxxxxx
            xxx777777777xxxx2xxxxxxxxxxxxxxxxx
            xfffffffffxxxxxx1xxxxxxxxxxxxxxxxx
            xfffffffffxxxxxx111111111111111111
            xfffffffffxxxxxx111111111111111111
            xfffffffffxxxxxx111111111111111111
            xfffffffffxxxxxx111111111111111111
            xfffffffffxxxxxx111111111111111111
            xfffffffffxxxxxx111111111111111111
            xxxxxxxxxxxxxxxx111111111111111111
            xxxxxxxxxxxxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxx111111111111111111
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            x000000000xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model2: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xjjjjjjjjjjjjjx0000xxxxxxxxxx
            xxxxxxxxxxxxiix0000xxxxxxxxxx
            xxxxxxxxxxxxhhx0000xxxxxxxxxx
            xxxxxxxxxxxxggx0000xxxxxxxxxx
            xxxxxxxxxxxxffx0000xxxxxxxxxx
            xxxxxxxxxxxxeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            eeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xeeeeeeeeeeeeex0000xxxxxxxxxx
            xxxxxxxxxxxxddx00000000000000
            xxxxxxxxxxxxccx00000000000000
            xxxxxxxxxxxxbbx00000000000000
            xxxxxxxxxxxxaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xaaaaaaaaaaaaax00000000000000
            xxxxxxxxxxxx99x0000xxxxxxxxxx
            xxxxxxxxxxxx88x0000xxxxxxxxxx
            xxxxxxxxxxxx77x0000xxxxxxxxxx
            xxxxxxxxxxxx66x0000xxxxxxxxxx
            xxxxxxxxxxxx55x0000xxxxxxxxxx
            xxxxxxxxxxxx44x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            x4444444444444x0000xxxxxxxxxx
            xxxxxxxxxxxx33x0000xxxxxxxxxx
            xxxxxxxxxxxx22x0000xxxxxxxxxx
            xxxxxxxxxxxx11x0000xxxxxxxxxx
            xxxxxxxxxxxx00x0000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            x000000000000000000xxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model3: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxx
            xxx0000000000000x
            xxx0000000000000x
            xxx0000000000000x
            xxx0000000000000x
            xxx0000000000000x
            xxx0000000000000x
            x000000000000000x
            x000000000000000x
            x000000000000000x
            0000000000000000x
            x000000000000000x
            x000000000000000x
            x000000000000000x
            xxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model4: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxaaaaaaaaaaax
            xxxxxxxxxaaaaaaaaaaax
            xxxxxxxxxaaaaaaaaaaax
            xxxxxxxxxaaaaaaaaaaax
            x00000000xxxxxaaaaaax
            x00000000xxxxxaaaaaax
            x00000000xxxxxaaaaaax
            x00000000xxxxxaaaaaax
            x0000000000000aaaaaax
            00000000000000aaaaaax
            x0000000000000aaaaaax
            x0000000000000aaaaaax
            x0000000000000xxxxxxx
            x0000000000000xxxxxxx
            x0000000000000xxxxxxx
            x0000000000000xxxxxxx
            x0000000000000xxxxxxx
            x0000000000000xxxxxxx
            xxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model5: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            000000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            x00000000000000000000000000000000x
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model6: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x000000000000000000000000xxxx
            x222222222x00000000xxxxxxxx00000000xxxx
            x11xxxxxxxx00000000xxxxxxxx00000000xxxx
            x00x000000000000000xxxxxxxx00000000xxxx
            x00x000000000000000xxxxxxxx00000000xxxx
            x000000000000000000xxxxxxxx00000000xxxx
            x000000000000000000xxxxxxxx00000000xxxx
            0000000000000000000xxxxxxxx00000000xxxx
            x000000000000000000xxxxxxxx00000000xxxx
            x00x000000000000000xxxxxxxx00000000xxxx
            x00x000000000000000xxxxxxxx00000000xxxx
            x00xxxxxxxxxxxxxxxxxxxxxxxx00000000xxxx
            x00xxxxxxxxxxxxxxxxxxxxxxxx00000000xxxx
            x00x0000000000000000000000000000000xxxx
            x00x0000000000000000000000000000000xxxx
            x0000000000000000000000000000000000xxxx
            x0000000000000000000000000000000000xxxx
            x0000000000000000000000000000000000xxxx
            x0000000000000000000000000000000000xxxx
            x00x0000000000000000000000000000000xxxx
            x00x0000000000000000000000000000000xxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model7: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxx
            x222222xx00000000xxxxxxxx
            x222222xx00000000xxxxxxxx
            x2222221000000000xxxxxxxx
            x2222221000000000xxxxxxxx
            x222222xx00000000xxxxxxxx
            x222222xx00000000xxxxxxxx
            x222222xxxxxxxxxxxxxxxxxx
            x222222xkkkkkkxxiiiiiiiix
            x222222xkkkkkkxxiiiiiiiix
            x222222xkkkkkkjiiiiiiiiix
            x222222xkkkkkkjiiiiiiiiix
            x222222xkkkkkkxxiiiiiiiix
            xxx11xxxkkkkkkxxiiiiiiiix
            xxx00xxxkkkkkkxxxxxxxxxxx
            x000000xkkkkkkxxxxxxxxxxx
            x000000xkkkkkkxxxxxxxxxxx
            0000000xkkkkkkxxxxxxxxxxx
            x000000xkkkkkkxxxxxxxxxxx
            x000000xkkkkkkxxxxxxxxxxx
            x000000xxxjjxxxxxxxxxxxxx
            x000000xxxiixxxxxxxxxxxxx
            x000000xiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
            xxxxxxxxiiiiiixxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model8: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555555555555555555xxxxxxxxx
            x5555555555xxxxxxxxxxxxxxxxxxxxxxxx
            x55555555554321000000000000000000xx
            x55555555554321000000000000000000xx
            x5555555555xxxxx00000000000000000xx
            x555555x44x0000000000000000000000xx
            x555555x33x0000000000000000000000xx
            x555555x22x0000000000000000000000xx
            x555555x11x0000000000000000000000xx
            5555555x00x0000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            x555555x0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxx0000000000000000000000000xx
            xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};

export const Model9: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxx
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            00000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            x0000000000000000000000x
            xxxxxxxxxxxxxxxxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 111),
        wallMaterial: new WallMaterial(scuti, 112)
      });
    },
  },
};
