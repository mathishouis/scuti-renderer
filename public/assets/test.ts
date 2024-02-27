import { FloorMaterial, WallMaterial } from '../../src/objects/rooms/materials';
import { Room } from '../../src/objects/rooms';
import { Scuti } from '../../src/Scuti';
import { preload } from './main';

export const renderer: Scuti = new Scuti({
  canvas: document.getElementById('app') as HTMLCanvasElement,
  resources: 'http://127.0.0.1:8081',
  backgroundColor: 0x0c567c,
  zoom: { direction: 'center' },
  preload,
});

await renderer.load();

const heightMap: string = `
x10012xxxxxxxxxx
x20000xxxxxxxxxx
000000xxx0000012
0000000000022000
x000000000001000
x10003xxx0000000
x10002xxx0000000
x20001xxx1200000
xxxxxxxxx0330000
`;

const room: Room = new Room({
  heightMap: heightMap,
  dragging: true,
  centerCamera: true,
  floorMaterial: new FloorMaterial(101),
  floorThickness: 8,
  wallHidden: true,
  wallMaterial: new WallMaterial(108),
  wallThickness: 8,
  wallHeight: -1,
});

renderer.add(room);
