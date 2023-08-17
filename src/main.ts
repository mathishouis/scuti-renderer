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

const heightMap: string =
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000011111000000x\n' +
    '00000011111000000x\n' +
    'x0000011111000000x\n' +
    'x0000000000000000x\n' +
    'x0000000001234000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n' +
    'x0000000000000000x\n';

const room: Room = new Room({
    heightMap: heightMap,
    dragging: true,
    centerCamera: false,
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
