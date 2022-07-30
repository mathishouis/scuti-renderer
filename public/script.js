import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";

console.log("ccc");

let scuti = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight
});

let room = new Room(scuti,{ tilemap: "00000" });