import type { Meta, StoryObj } from '@storybook/vue3';
import type { Scuti } from 'scuti-renderer';
import { FloorMaterial, WallMaterial, Room, Avatar, AvatarAction, FloorFurniture } from 'scuti-renderer';

import Renderer from './Renderer.vue';
import { FurnitureRoomBackgroundVisualization } from '../../../src';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/vue/writing-stories/introduction
const meta: Meta<typeof Renderer> = {
  title: 'Scuti/Room/Official',
  component: Renderer,
  tags: ['autodocs'],
  argTypes: {
    tileMap: { control: 'text' }
  }
};

export default meta;
type Story = StoryObj<typeof Renderer>;

export const WelcomeLounge: Story = {
  args: {
    cb: (scuti: Scuti) => {
      const room = new Room(scuti, {
        tileMap: `
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxxxxxxxxxxxxxxxxxxxxx
            xxxxx00xxxxxxxxxxxxxxxxx
            xxxxx00xxxxxxxxxxxxxxxxx
            xxxxx00xxxxx00xxxxxxxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx00000000xxxxx
            xxxxxxxxxxx000000000000x
            xxxxxxxxxxx000000000000x
            xxxxxxxxxxx000000000000x
            xxxxxxxxxx0000000000000x
            xxxxxxxxxxx0000000000000
            xxxxxxxxxxx0000000000000
            x66666xxxxx000000000000x
            x66666xxxxx000000000000x
            x6666xxxxxx000000000000x
            x6666xxxxxx000000000000x
            x6666xxxxxx00000000xxxxx
            x6666xxxxxx00000000xxxxx
            x6666xxxxxx00000000xxxxx
            x6666xxxxxx00000000xxxxx
            x6666xxxxxx00000000xxxxx
            x6666xxxxxx00000000xxxxx
            xxxxxxxxxxxx00xxxxxxxxxx
        `,
        floorMaterial: new FloorMaterial(scuti, 110),
        wallMaterial: new WallMaterial(scuti, 1601)
      });
      const background = (
        imageUrl: string,
        position: {
          x: number;
          y: number;
          z: number;
        },
        offsets: {
          x: number;
          y: number;
          z: number;
        }
      ) => {
        const backgroundFurniture = new FloorFurniture({
          id: 3996,
          position: position,
          direction: 1,
          state: 1
        });
        backgroundFurniture.onLoad = () => {
          backgroundFurniture.visualization.offsetX = offsets.x;
          backgroundFurniture.visualization.offsetY = offsets.y;
          backgroundFurniture.visualization.offsetZ = offsets.z;
          backgroundFurniture.visualization.imageUrl = imageUrl;
        };
        room.objects.add(backgroundFurniture);
      };
      const furniture = (
        position: {
          x: number;
          y: number;
          z: number;
        },
        id: number,
        rotation: number,
        state: number
      ) => {
        const furniture = new FloorFurniture({
          id: id,
          position: position,
          direction: rotation,
          state: state
        });
        room.objects.add(furniture);
      };
      background(
        '/images/room_ads/wl15/wl15_a.png',
        {
          x: 0,
          y: 22,
          z: 5
        },
        {
          x: -335,
          y: 222,
          z: 8700
        }
      );
      background(
        '/images/room_ads/wl15/wl15_b.png',
        {
          x: 10,
          y: 10,
          z: -1
        },
        {
          x: -253,
          y: 187,
          z: 9995
        }
      );
      background(
        '/images/room_ads/wl15/wl15_c.png',
        {
          x: 11,
          y: 11,
          z: -1
        },
        {
          x: -704,
          y: 155,
          z: 8700
        }
      );
      background(
        '/images/room_ads/wl15/wl15_d.png',
        {
          x: 11,
          y: 11,
          z: 0
        },
        {
          x: -253,
          y: 446,
          z: 8700
        }
      );
      background(
        '/images/room_ads/wl15/wl15_e.png',
        {
          x: 19,
          y: 19,
          z: -1
        },
        {
          x: -720,
          y: 190,
          z: 8700
        }
      );
      furniture(
        {
          x: 11,
          y: 25,
          z: 0
        },
        7589,
        0,
        0
      );
      furniture(
        {
          x: 11,
          y: 16,
          z: 0
        },
        7589,
        0,
        0
      );
      furniture(
        {
          x: 11,
          y: 11,
          z: 0
        },
        7588,
        0,
        0
      );
    }
  }
};
