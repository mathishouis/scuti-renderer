import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";

let scuti = new Scuti({
    canvas: document.getElementById("app"),
    width: window.innerWidth,
    height: window.innerHeight
});

let tilemap1 = "xxxxxx\n" +
    "x4444432110011111x\n" +
    "x444443211001xx00x\n" +
    "0000000011001xx00x\n" +
    "x0000000000000000x\n" +
    "x0001000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "00000000000001000x\n" +
    "x0000432100011110x\n" +
    "x0000000000001000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000000000000x\n" +
    "x0000000100000000x\n" +
    "x0000001110000000x\n" +
    "x0000011211000000x\n" +
    "x0000012221000000x\n" +
    "x000111232111100x\n" +
    "x0001112321111000x\n" +
    "x0000012321000000x\n" +
    "x0000012221000000x\n" +
    "x0000011211000000x\n" +
    "x00000011100xxxxxx\n" +
    "x00000001000xxxxxx\n" +
    "x00000000000xxxxxx\n" +
    "x00000000000xxxxxx\n";

let tilemap2 =
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxxxxxxxxxxxxxxxxxxx\n" +
    "xxxxxx55555555555543211\n" +
    "xxxxxx55555555555543211\n" +
    "xxxxxx00000000000000011\n" +
    "xxxxx000000000000000000\n" +
    "xxxxxx00000000000000000\n" +
    "xxxxxx90000000000000000\n" +
    "xxxxxx80000000000000000\n" +
    "xxxxxx70000000000000000\n" +
    "xxxxxx60000000000000000\n" +
    "xxxxxx50000000000000000\n" +
    "xxxxxx40000xxxxxxxx0000\n" +
    "xxxxxx30000000000000000\n" +
    "xxxxxx20000000000000000\n" +
    "xxxxxx10000000000000000\n" +
    "xxxxxx00000000000000000\n" +
    "xxxxx000000000000000000\n" +
    "xxxxxx0000000000000000x\n" +
    "xxxxxx00000000000000000\n" +
    "xxxxxx000000000000xxxxx\n" +
    "xxxxxx000000000000xxxxx\n";

let room = new Room(scuti,{ tilemap: tilemap2

    , tileColor: 0x989865, wallColor: 0xB6B8C7 });