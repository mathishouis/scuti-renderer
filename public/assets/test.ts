import { FloorMaterial, WallMaterial } from '../../src/objects/rooms/materials';
import { Room } from '../../src/objects/rooms';
import { Scuti } from '../../src/Scuti';
import { preload } from './main';

export const renderer: Scuti = new Scuti({
  canvas: document.getElementById('app') as HTMLCanvasElement,
  resources: 'http://127.0.0.1:8081',
  backgroundColor: 0x0c567c,
  zoom: { direction: 'center' },
  // camera: { position: { x: 200, y: 200 } },
  preload,
});

await renderer.load();

const heightMap: string = `
x10012xxxxxxxxxx
x20000xxxxxxxxxx
000000xxx0000000
0000000000021000
x000111111111000
x100020000010000
x10001x000010100
x20001x000010000
xxxxx00001030000
xxxx1002241xxxxx
xxxx00006100xxxx
xxxx1000000000xx
xxxxxxx0x0000xxx
xxxx200000x00xxx
xxxx100010xxxxxx
xxxx000001xxxxxx
xxxx020000xxxxxx
xxx2112001xxxxxx
xxx000011xxxxxxx
xxx00xxxxxxxxxxx
`;

const room: Room = new Room({
  heightMap: heightMap,
  dragging: true,
  floorMaterial: new FloorMaterial(101),
  floorThickness: 8,
  wallHidden: true,
  wallMaterial: new WallMaterial(108),
  wallThickness: 8,
  wallHeight: -1,
});

renderer.add(room);
