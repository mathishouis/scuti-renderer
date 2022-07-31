import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";

let scuti = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight
});

let room = new Room(scuti,{ tilemap: "xxxxxx\n" +
    "x1000000000000000x\n" +
    "x000000011000xx00x\n" +
    "0000000011000xx00x\n" +
    "x0000000000000000x\n" +
    "x0001000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "00000000000001000x\n" +
        "x0000432100011110x\n" +
        "x0000000000001000x\n" +
        "x0000000000000000x\n" +
        "x00000000000xxxxxx\n", tileColor: 0x989865, wallColor: 0xB6B8C7 });