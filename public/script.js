import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";

console.log("ccc");

let scuti = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight
});

let room = new Room(scuti,{ tilemap: "xxxxxx\n" +
    "x0000x\n" +
    "x0000x\n" +
    "00000x\n" +
    "x0000x\n" +
    "x0000x\n" +
    "xxxxxx\n", tileColor: 0xFFFFFF, wallColor: 0xFFFFFF });