import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";

let scuti = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight
});

let room = new Room(scuti,{ tilemap: "xxxxxx\n" +
    "x1000x\n" +
    "x0000x\n" +
    "00000x\n" +
    "x0000x\n" +
    "x0001x\n" +
    "xxxxxx\n", tileColor: 0x989865, wallColor: 0xB6B8C7 });