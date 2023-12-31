import './style.css';
import { Scuti } from '../../src/Scuti';
import { Room } from '../../src/objects/rooms/Room';
import { FloorMaterial } from '../../src/objects/rooms/materials/FloorMaterial';
import { WallMaterial } from '../../src/objects/rooms/materials/WallMaterial';
import { TileEvent } from '../../src/entities/Events';
import { LandscapeMaterial } from '../../src';
import { FloorFurniture } from '../../src/objects/rooms/objects/furnitures/FloorFurniture';
import { benchmark } from '../../src/utils/Benchmark';
import { perf } from '../../src/utils/Logger';
import { WallFurniture } from '../../src/objects/rooms/objects/furnitures/WallFurniture';

const renderer: Scuti = new Scuti({
  canvas: document.getElementById('app') as HTMLElement,
  width: window.innerWidth,
  height: window.innerHeight,
  resources: 'http://127.0.0.1:8081',
  backgroundColor: 0x0c567c,
  //backgroundColor: 0x000000,
  resizeTo: window,
});

// @ts-ignore
await renderer.load();

const heightMap: string = `
xxxxxx
x00000
x00000
x00000
x00000
x00000
`;

const room: Room = new Room({
  heightMap: heightMap,
  dragging: true,
  centerCamera: true,
  floorMaterial: new FloorMaterial(101),
  floorThickness: 8,
  wallMaterial: new WallMaterial(108),
  wallThickness: 8,
  wallHeight: -1,
  landscapeMaterial: new LandscapeMaterial(101),
  scrollZoom: true,
});

renderer.add(room);

/*setInterval(() => {
    const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
    room.configuration.floorMaterial = new FloorMaterial(random)
    room.configuration.floorThickness = 8;
=======
let zoom = 1;
const [min_zoom, max_zoom] = [0.5, 5];

renderer.application.view.addEventListener(
  'wheel',
  // @ts-ignore
  ({ deltaY }) => {
    // todo(): add support accross browsers
    const delta = deltaY > 0 ? -0.25 : 0.25;

    zoom += delta;
    zoom = Math.max(min_zoom, Math.min(max_zoom, zoom));

    room.camera.zoom(zoom, 0.25);
  },
  { passive: true },
);

const present = new FloorFurniture({
  id: 3372,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  direction: 2,
  state: 0,
  ribbonType: 2,
  packetType: 3,
});
room.add(present);
setTimeout(() => {
  present.state = 1;
}, 5000);
/*const dragon1 = new FloorFurniture({
  id: 8213,
  position: {
    x: -10,
    y: 12,
    z: 100,
  },
  direction: 2,
  state: 0,
});
room.add(dragon1);*/
setTimeout(() => {
  //present.destroy();
  const dragon = new FloorFurniture({
    id: 8213,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    direction: 4,
    state: 0,
  });
  room.add(dragon);
  setTimeout(() => {
    dragon.position = {
      x: 0,
      y: 2,
      z: 0,
    };
    setTimeout(() => {
      dragon.rotate({
        direction: 2,
        duration: 0.5,
      });
    }, 1000);
    setTimeout(() => {
      dragon.state = 1;
    }, 2000);
    //dragon.direction = 4;
  }, 2000);

  /*room.events.tiles.onPointerMove = (event: TileEvent) => {
    //dragon.move({ position: event.position, duration: 0.5 });
  };*/
}, 6000);

const wheel = new WallFurniture({
  id: 4010,
  position: {
    x: -1,
    y: 1,
    offsets: {
      x: 7,
      y: -25,
    },
  },
  direction: 2,
  state: 0,
});
//room.add(wheel);

const windowFurniture = new WallFurniture({
  id: 4054,
  position: {
    x: 3,
    y: 0,
    offsets: {
      x: 0,
      y: -31,
    },
  },
  /*position: {
    x: -1,
    y: 1,
    offsets: {
      x: 7,
      y: -25,
    },
  },*/
  direction: 4,
  state: 0,
});

const windowFurniture2 = new WallFurniture({
  id: 4039,
  position: {
    x: -1,
    y: 1,
    offsets: {
      x: 7,
      y: -25,
    },
  },
  direction: 2,
  state: 0,
});

const windowFurniture3 = new WallFurniture({
  id: 4037,
  position: {
    x: -1,
    y: 3,
    offsets: {
      x: 7,
      y: -25,
    },
  },
  direction: 2,
  state: 0,
});

/*setTimeout(() => {
  wheel2.state = 2;
}, 1000);*/
room.add(windowFurniture);
room.add(windowFurniture2);
room.add(windowFurniture3);

room.events.tiles.onPointerMove = (event: TileEvent) => {
  windowFurniture.position = {
    x: event.position.x - 1,
    y: event.position.y - 3,
    offsets: { x: -7, y: 0 },
  };
};
