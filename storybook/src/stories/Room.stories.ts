import type { Meta, StoryObj } from '@storybook/vue3'
import type { Scuti } from 'scuti-renderer'
import { FloorMaterial, WallMaterial, Room, Avatar, AvatarAction, FloorFurniture } from 'scuti-renderer'

import Renderer from './Renderer.vue'

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof Renderer> = {
  title: 'Scuti/Room',
  component: Renderer,
  tags: ['autodocs'],
  argTypes: {
    tileMap: { control: 'text' }
  }
}

export default meta
type Story = StoryObj<typeof Renderer>

export const DefaultRoom: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxx
            x00
            x00
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const Stairs: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxx
            x1100
            x1100
            x0000
            x0000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const StairCorners: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxxx
          x000000
          x000000
          x001100
          x001100
          x000000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const StairWalls: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxxxxx
          x44321000
          x44321000
          x33000000
          x22000000
          x11000000
          x00000000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const MultipleSubsequentStairs: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxx
          x22100
          x22100
          x11000
          x00000
          x00000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const Holes: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxx
          x00000
          x0x0x0
          x00x00
          x0x0x0
          x00000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const AngledRoom: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxxx
          xxxx000
          xxxx000
          xxxx000
          x000000
          x000000
          x000000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const Door: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxx
          x0000
          00000
          x0000
          x0000
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const OtherRoomShape: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap:
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          '00000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n' +
          'x0000000000000000x\n',
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })
    }
  }
}

export const CustomLook: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
          xxxxxxxxx
          xxxx11100
          xxxx11100
          xxxx00000
          x00000000
          000000000
          x00000000
          `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })

      room.wallThickness = 0
      room.wallHeight = 128
      room.floorThickness = 2
      room.wallThickness = 2
    }
  }
}

export const TestTileClick: Story = {
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
          xxxxx000000x
          xxxxx000000x
          xxxxx000000x
          xxxxx000000x
          xxxxxxxxxxxx
          xxxxxxxxxxxx
          xxxxxxxxxxxx
          xxxxxxxxxxxx
          xxxxxxxxxxxx
          `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      })

      const avatar = new Avatar({
        figure: 'hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80',
        position: {
          x: 4,
          y: 4,
          z: 0
        },
        bodyDirection: 2,
        headDirection: 2,
        actions: [
          //AvatarAction.Idle,
          //AvatarAction.Walk,
          AvatarAction.Talk,
          AvatarAction.Wave,
          AvatarAction.Walk,
          AvatarAction.CarryItem
        ],
        handItem: 55
      })
      room.objects.add(avatar)

      const furniture = new FloorFurniture({
        id: 1619,
        position: {
          x: 7,
          y: 5,
          z: 0
        },
        direction: 4,
        state: 1
      })
      room.objects.add(furniture)

      room.tiles.onPointerDown = (position: any) => {
        console.log('click', position)
        avatar.pos = position.position
      }
    }
  }
}
