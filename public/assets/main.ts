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

const renderer: Scuti = new Scuti({
  canvas: document.getElementById('app') as HTMLElement,
  width: window.innerWidth,
  height: window.innerHeight,
  resources: 'http://127.0.0.1:8081',
  backgroundColor: 0x0c567c,
  resizeTo: window,
});

// @ts-ignore
await renderer.load();

/*const heightMap: string =`
xxxxxxxxxxxxxxxxxxxxxxxxxxxx
x2222xx1111111111xx11111111
x2222xx1111111111xx11111111
222222111111111111111111111
x22222111222222222211211111
x22222111111111111111211111
x22222111111111111111211111
x2222xx1112111111xx11222211
x2222xx1112211111xx11111111
x2222xx1222221111xxxx1111xx
x2222xx1112111111xxxx0000xx
xxxxxxx1111111111xx00000000
xxxxxxx1111111111xx00111000
x22222111111111111000122000
x22222111112111111000111000
x22222111122211111000111000
x22222111112111111000010000
x2222xx1111111111xx00000000
x2222xx1111111111xx00000000
x2222xxxx1111xxxxxxxxxxxxxx
x2222xxxx0000xxxxxxxxxxxxxx
x2222x0000000000xxxxxxxxxxx
x2222x0011111100xxxxxxxxxxx
x2222x0010000100xxxxxxxxxxx
x2222x0010000100xxxxxxxxxxx
x2222x0010000100xxxxxxxxxxx
x2222x0000000000xxxxxxxxxxx
`;*/

/*const heightMap: string = `
xxxxxxxxxx
3321000100
x100000000
x000000000
x000001000
xxx00111xx
xxx0001000
x00000x000
x00000xx00
x000xxxxx0
x400000000
x300000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
`;*/

const heightMap: string = `
xxxxxxxxxx
xxxx000400
xxxx000000
x000000000
xx00000000
xxx00000xx
xxx0000000
x00000x000
x00000xx00
x000xxxxx0
x000000000
x000000000
xx00000000
xx00000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
`;
/*const heightMap: string = `
xxxxxxxxxx
x000000000
0000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
x000000000
`;*/

/*const heightMap: string = `
xxxxxxxxxx
3310000100
x200000000
x100000000
x000001000
xxx00111xx
xxx0001000
x00000x000
x00000xx00
x000xxxxx0
`;*/

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
});

renderer.add(room);
benchmark('123a');
const tv = new FloorFurniture({
  id: 3886,
  position: {
    x: 4,
    y: 10,
    z: 0,
  },
  direction: 2,
  state: 1,
});
room.add(tv);
room.add(
  new FloorFurniture({
    id: 62,
    position: {
      x: 8,
      y: 10,
      z: 0,
    },
    direction: 4,
    state: 1,
  }),
);

room.add(
  new FloorFurniture({
    id: 1619,
    position: {
      x: 5,
      y: 16,
      z: 0,
    },
    direction: 4,
    state: 1,
  }),
);
room.add(
  new FloorFurniture({
    id: 1620,
    position: {
      x: 6,
      y: 16,
      z: 0,
    },
    direction: 4,
    state: 1,
  }),
);
const dragon = new FloorFurniture({
  id: 1621,
  position: {
    x: 7,
    y: 16,
    z: 0,
  },
  direction: 4,
  state: 1,
});
room.add(dragon);
room.add(
  new FloorFurniture({
    id: 1622,
    position: {
      x: 8,
      y: 16,
      z: 0,
    },
    direction: 4,
    state: 1,
  }),
);
room.add(
  new FloorFurniture({
    id: 14863,
    position: {
      x: 9,
      y: 16,
      z: 0,
    },
    direction: 2,
    state: 0,
  }),
);
room.add(
  new FloorFurniture({
    id: 14281,
    position: {
      x: 6,
      y: 23,
      z: 0,
    },
    direction: 2,
    state: 0,
  }),
);
room.add(
  new FloorFurniture({
    id: 3029,
    position: {
      x: 11,
      y: 14,
      z: 0,
    },
    direction: 4,
    state: 2,
  }),
);
const gate = new FloorFurniture({
  id: 4389,
  position: {
    x: 4,
    y: 16,
    z: 0,
  },
  direction: 2,
  state: 101,
  // @ts-ignore
  primaryColor: 0x00ffff,
  secondaryColor: 0xff00ff,
});
room.add(gate);

const badge = new FloorFurniture({
  id: 4249,
  position: {
    x: 8,
    y: 17,
    z: 0,
  },
  direction: 2,
  state: 0,
  // @ts-ignore
  primaryColor: 0x00ffff,
  secondaryColor: 0xff00ff,
  badge: 'http://127.0.0.1:8081/images/badges/b24114s13104t24134045306c93d0e4305fe1925250449c1c3.gif',
});
room.add(badge);

const badgePennant = new FloorFurniture({
  id: 4253,
  position: {
    x: 9,
    y: 22,
    z: 0,
  },
  direction: 2,
  state: 0,
  // @ts-ignore
  primaryColor: 0x00ffff,
  secondaryColor: 0xff00ff,
  badge: 'http://127.0.0.1:8081/images/badges/b24114s13104t24134045306c93d0e4305fe1925250449c1c3.gif',
});
room.add(badgePennant);

const badgeDisplay = new FloorFurniture({
  id: 5013,
  position: {
    x: 10,
    y: 16,
    z: 0,
  },
  direction: 2,
  state: 0,
  // @ts-ignore
  badge: 'http://127.0.0.1:8081/images/badges/b24114s13104t24134045306c93d0e4305fe1925250449c1c3.gif',
});
room.add(badgeDisplay);

const forum = new FloorFurniture({
  id: 5863,
  position: {
    x: 0,
    y: 0,
    z: 20,
  },
  direction: 2,
  state: 1,
  // @ts-ignore
  thumbnail: 'http://127.0.0.1:8081/images/badges/b24114s13104t24134045306c93d0e4305fe1925250449c1c3.gif',
  primaryColor: 0xffff00,
  secondaryColor: 0x00ff00,
});
room.add(forum);

const beamer = new FloorFurniture({
  id: 2961,
  position: {
    x: 0,
    y: 0,
    z: 25,
  },
  direction: 2,
  state: 1,
});
room.add(beamer);

const bottle = new FloorFurniture({
  id: 129,
  position: {
    x: 10,
    y: 20,
    z: 0,
  },
  direction: 2,
  state: -1,
});
room.add(bottle);
setTimeout(() => {
  bottle.visualization.setState(0);
}, 3000);

const mpu = new FloorFurniture({
  id: 4276,
  position: {
    x: 5,
    y: 30,
    z: 0,
  },
  direction: 0,
  state: 0,
  image: 'http://127.0.0.1:8081/images/ads/mpu/mpu_habbosafety.png',
});
room.add(mpu);

const mpu2 = new FloorFurniture({
  id: 4069,
  position: {
    x: -5,
    y: 20,
    z: 0,
  },
  direction: 0,
  state: 0,
  offsets: {
    x: 0,
    y: 0,
    z: 0,
  },
  image: 'http://127.0.0.1:8081/images/ads/mpu/MPU_FR.png',
});
room.add(mpu2);

const bg = new FloorFurniture({
  id: 3996,
  position: {
    x: -20,
    y: 20,
    z: 0,
  },
  direction: 0,
  state: 0,
  offsets: {
    x: 0,
    y: 0,
    z: 10000,
  },
  image: 'http://127.0.0.1:8081/images/ads/wl15/wl15_a.png',
});
room.add(bg);

const counter = new FloorFurniture({
  id: 3525,
  position: {
    x: -8,
    y: 0,
    z: 0,
  },
  direction: 0,
  state: 3653,
});
room.add(counter);

setInterval(() => {
  counter.setState(counter.state - 1);
}, 1000);

const counter2 = new FloorFurniture({
  id: 3645,
  position: {
    x: -10,
    y: 0,
    z: 0,
  },
  direction: 0,
  state: 100,
});
room.add(counter2);

setInterval(() => {
  counter2.setState(counter2.state - 1);
}, 1000);

const scoreBoard = new FloorFurniture({
  id: 3756,
  position: {
    x: -10,
    y: 0,
    z: 16,
  },
  direction: 0,
  state: 10,
});
room.add(scoreBoard);

setInterval(() => {
  scoreBoard.setState(scoreBoard.state - 1);
}, 1000);

const votecounter = new FloorFurniture({
  id: 4367,
  position: {
    x: -10,
    y: 0,
    z: 10,
  },
  direction: 4,
  state: 0,
  value: 9,
});
room.add(votecounter);

const votecounter2 = new FloorFurniture({
  id: 5378,
  position: {
    x: -10,
    y: 0,
    z: 12,
  },
  direction: 4,
  state: 2,
  value: 263,
});
room.add(votecounter2);

const water = new FloorFurniture({
  id: 3541,
  position: {
    x: 2,
    y: 2,
    z: 12,
  },
  direction: 4,
  state: 0,
});
room.add(water);

const roller = new FloorFurniture({
  id: 1649,
  position: {
    x: 2,
    y: 2,
    z: 16,
  },
  direction: 4,
  state: 0,
});
room.add(roller);

setInterval(() => {
  roller.setState(2);
}, 1000);

const fireworks = new FloorFurniture({
  id: 3784,
  position: {
    x: -10,
    y: 0,
    z: 5,
  },
  direction: 0,
  state: 2,
});
room.add(fireworks);
perf('123a', '123a');

/*const pennant = new FloorFurniture({
  id: 4253,
  position: {
    x: 10,
    y: 16,
    z: 0,
  },
  direction: 2,
  state: 0,
  // @ts-ignore
  primaryColor: 0x00ffff,
  secondaryColor: 0xff00ff,
  badge: 'http://127.0.0.1:8081/badges/b24114s13104t24134045306c93d0e4305fe1925250449c1c3.gif',
});
room.add(pennant);*/

setTimeout(() => {
  // @ts-ignore
  gate.visualization.primaryColor = 0xffff00;
}, 3000);

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

/*setInterval(() => {
    const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
    room.configuration.floorMaterial = new FloorMaterial(random)
    room.configuration.floorThickness = 8;
}, 1000);*/

room.events.tiles.onPointerUp = (event: TileEvent) => {
  console.log(event.position);
};

//setTimeout(() => renderer.configuration.backgroundColor = 0xFF0000, 2000);
//setTimeout(() => renderer.configuration.width = 200, 3000);
//setTimeout(() => renderer.configuration.resizeTo = window, 4000);
//setTimeout(() => renderer.configuration.canvas = document.getElementById("stats") ?? document.body, 4000);

/*setTimeout(() => room.camera.zoom(2), 1000);
setTimeout(() => room.camera.zoom(4), 2000);
setTimeout(() => room.camera.zoom(5), 3000);
setTimeout(() => room.camera.zoom(8, 1), 4000);

setTimeout(() => room.camera.zoom(2), 5000);
setTimeout(() => room.camera.zoom(4), 6000);
setTimeout(() => room.camera.zoom(0.5), 7000);

setTimeout(() => room.camera.zoom(5), 8000);*/

/*setTimeout(() => room.camera.zoom = 3, 3000);
setTimeout(() => room.camera.zoom = 0.5, 4000);
setTimeout(() => room.camera.zoom = 2, 5000);
setTimeout(() => room.camera.zoom = 1, 6000);*/
