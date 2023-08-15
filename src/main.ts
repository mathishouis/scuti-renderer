import "./style.css";
import {Scuti} from "./Scuti.ts";
import {Room} from "./objects/rooms/Room.ts";

console.log("Hello Word");

const renderer: Scuti = new Scuti({
    canvas: document.getElementById('app'),
    width: window.innerWidth,
    height: window.innerHeight,
    resources: './resources'
});

const room: Room = new Room({
    heightMap: "0x00x0",
    dragging: true,
    centerCamera: true,
});

renderer.add(room);

setTimeout(() => room.camera.zoom(2), 1000);
setTimeout(() => room.camera.zoom(4), 2000);
setTimeout(() => room.camera.zoom(5), 3000);
setTimeout(() => room.camera.zoom(8, 1), 4000);

setTimeout(() => room.camera.zoom(2), 5000);
setTimeout(() => room.camera.zoom(4), 6000);
setTimeout(() => room.camera.zoom(0.5), 7000);

setTimeout(() => room.camera.zoom(5), 8000);


/*setTimeout(() => room.camera.zoom = 3, 3000);
setTimeout(() => room.camera.zoom = 0.5, 4000);
setTimeout(() => room.camera.zoom = 2, 5000);
setTimeout(() => room.camera.zoom = 1, 6000);*/