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