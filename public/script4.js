import { Scuti } from '../src/Scuti';
import { Room } from '../src/objects/rooms/Room';
import { FloorMaterial } from '../src/objects/rooms/materials/FloorMaterial';
import { WallMaterial } from '../src/objects/rooms/materials/WallMaterial';
import { FloorFurniture } from '../src/objects/furnitures/FloorFurniture';
import {WiredSelectionFilter} from "../src/objects/filters/WiredSelectionFilter";

(async () => {
  const renderer = new Scuti({
    canvas: document.getElementById('app'),
    width: window.innerWidth,
    height: window.innerHeight,
    resources: 'https://kozennnn.github.io/scuti-resources/'
  });
  await renderer.loadResources('https://kozennnn.github.io/scuti-resources/');

  const tileMap = '000000\n' + '000000\n' + '000000\n' + '000000\n' + '000000\n';

  const room = new Room(renderer, {
    tileMap: tileMap,
    floorMaterial: new FloorMaterial(renderer, 110),
    wallMaterial: new WallMaterial(renderer, 2301)
  });
  const furniture = new FloorFurniture({
    //id: 4950,
    //id: 1619,
    id: 4967,
    position: {
      x: 5,
      y: 4,
      z: 0
    },
    direction: 2,
    state: 1
  });
  room.objects.add(furniture);
  furniture.onPointerDown = () => {
    console.log('clicked');
  };
  const furniture3 = new FloorFurniture({
    id: 8916,
    position: {
      x: 10,
      y: 10,
      z: 0
    },
    direction: 2,
    state: 1
  });
  const furniture2 = new FloorFurniture({
    id: 8916,
    position: {
      x: 8,
      y: 10,
      z: 0
    },
    direction: 2,
    state: 1
  });
  const wallFurniture = new FloorFurniture({
    id: 4625,
    position: {
      x: 8,
      y: 10,
      offsetX: 0,
      offsetY: 0
    },
    direction: 2,
    state: 1
  });
  //room.objects.add(furniture3);
  //room.objects.add(furniture2);
  //room.objects.add(wallFurniture);
  setTimeout(() => furniture.move({ x: 0, y: 0, z: 0 }), 3000);
  setTimeout(() => furniture.move({ x: 5, y: 4, z: 0 }), 5000);
  //setTimeout(() => room.objects.add(furniture), 6000);
  furniture3.onLoadComplete = () => {
    console.log('loaded!');
  };
  room.tiles.onPointerDown = (event) => {
    furniture.move(event.position);
    //room.tileMap = tileMap;
  };
  //dice(room, 5, 5, 2);
  document.onkeydown = (e) => {
    e = e || window.event;

    if (e.keyCode == '38') {
      if (room.camera.zoomLevel <= 1) {
        room.camera.zoomLevel = room.camera.zoomLevel * 2;
      } else {
        room.camera.zoomLevel += 1;
      }
    } else if (e.keyCode == '40') {
      if (room.camera.zoomLevel <= 1) {
        room.camera.zoomLevel = room.camera.zoomLevel / 2;
      } else {
        room.camera.zoomLevel -= 1;
      }
    } else if (e.keyCode == '37') {
      furniture.rotate(4);
    } else if (e.keyCode == '39') {
      const filter = new WiredSelectionFilter(0xffffff, 0x999999);
      furniture.addFilter(filter);
    }
  };
})();

function dice(room, x, y, z) {
  let furni5 = new FloorFurniture({
    position: {
      x: x,
      y: y,
      z: z
    },
    //direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
    direction: 0,
    //id: furniId[Math.floor(Math.random() * furniId.length)],
    id: 284,
    state: 1
  });
  room.objects.add(furni5);
  let timeout = undefined;
  furni5.onDoubleClick = (event) => {
    console.log(event);
    //if(furni5.infos.logic === "furniture_dice") {
    console.log('clicked furni5', event);
    if (event.tag === 'activate') {
      clearTimeout(timeout);
      furni5.state = -1;
      timeout = setTimeout(() => {
        furni5.state = Math.floor(Math.random() * 6) + 1;
      }, 1000);
      /*setTimeout(() => {
                    furni5.state = 0
                }, 2000);*/
    } else {
      clearTimeout(timeout);
      furni5.state = 0;
    }
    //x@}
  };
}
