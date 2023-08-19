import "./style.css";
import {Scuti} from "./Scuti.ts";
import {Room} from "./objects/rooms/Room.ts";
import {FloorMaterial} from "./objects/rooms/materials/FloorMaterial.ts";

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
`;

const room: Room = new Room({
    heightMap: heightMap,
    dragging: true,
    centerCamera: false,
    floorMaterial: new FloorMaterial(101),
    floorThickness: 8
});

renderer.add(room);

room.camera.zoom(1);

new FloorMaterial(101);

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
