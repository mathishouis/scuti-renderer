import "./style.css";
import {Scuti} from "./Scuti.ts";
import {Room} from "./objects/rooms/Room.ts";
import {FloorMaterial} from "./objects/rooms/materials/FloorMaterial.ts";
import {ITileEvent} from "./interfaces/IEvents.ts";

console.log("Hello Word");

const renderer: Scuti = new Scuti({
    canvas: document.getElementById('app') as HTMLElement,
    width: window.innerWidth,
    height: window.innerHeight,
    resources: './resources'
});

await renderer.load();

const heightMap: string =`xxxxxxxxxxxxxxxxxxxxxxxxxxx
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
x2222x0000000100xxxxxxxxxxx
x2222x0000000100xxxxxxxxxxx
x2222x0000000100xxxxxxxxxxx
x2222x0000000000xxxxxxxxxxx
`;
const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
const room: Room = new Room({
    heightMap: heightMap,
    dragging: true,
    centerCamera: false,
    floorMaterial: new FloorMaterial(random),
    floorThickness: 8
});

renderer.add(room);

room.camera.zoom(1);
room.camera.centerCamera(0);

/*setInterval(() => {
    const random = Math.floor(Math.random() * (111 - 101 + 1)) + 101;
    room.configuration.floorMaterial = new FloorMaterial(random)
    room.configuration.floorThickness = 8;
}, 1000);*/

new FloorMaterial(101);

room.events.tiles.onPointerUp = (event: ITileEvent) => {
    console.log(event.position);
};

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
