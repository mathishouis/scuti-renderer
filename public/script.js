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

let tilemap3 =
    "xxxxxxxxxxx\n" +
    "xxxxxxx00xx\n" +
    "xxxxxxx0000\n" +
    "xxx00000000\n" +
    "xx000000000\n" +
    "xxx00000000\n" +
    "xxx00000000\n" +
    "x0000000000\n" +
    "x0000000000\n" +
    "xx000000000\n" +
    "xx000000000\n";

let tilemap4 =
    "xxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
    "x2222xx1111111111xx11111111\n" +
    "x2222xx1111111111xx11111111\n" +
    "222222111111111111111111111\n" +
    "x22222111111111111111111111\n" +
    "x22222111111111111111111111\n" +
    "x22222111111111111111111111\n" +
    "x2222xx1111111111xx11111111\n" +
    "x2222xx1111111111xx11111111\n" +
    "x2222xx1111111111xxxx1111xx\n" +
    "x2222xx1111111111xxxx0000xx\n" +
    "xxxxxxx1111111111xx00000000\n" +
    "xxxxxxx1111111111xx00000000\n" +
    "x22222111111111111000000000\n" +
    "x22222111111111111000000000\n" +
    "x22222111111111111000000000\n" +
    "x22222111111111111000000000\n" +
    "x2222xx1111111111xx00000000\n" +
    "x2222xx1111111111xx00000000\n" +
    "x2222xxxx1111xxxxxxxxxxxxxx\n" +
    "x2222xxxx0000xxxxxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n" +
    "x2222x0000000000xxxxxxxxxxx\n";

let tilemap5 =
    "xxxxxxxxxxxxxxxxxxxx\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "2222221111111111111x\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "x222221111111111111x\n" +
    "xxxxxxxx1111xxxxxxxx\n" +
    "xxxxxxxx0000xxxxxxxx\n" +
    "x000000x0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "xxxxxxxx00000000000x\n" +
    "x000000x00000000000x\n" +
    "x000000x0000xxxxxxxx\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "x00000000000x000000x\n" +
    "xxxxxxxx0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x000000x0000x000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "x000000000000000000x\n" +
    "xxxxxxxxxxxxxxxxxxxx\n";

let tilemap6 =
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
    "x00000000xx0000000000xx0000x\n" +
    "x00000000xx0000000000xx0000x\n" +
    "000000000xx0000000000xx0000x\n" +
    "x00000000xx0000000000xx0000x\n" +
    "x00000000xx0000xx0000xx0000x\n" +
    "x00000000xx0000xx0000xx0000x\n" +
    "x00000000xx0000xx0000000000x\n" +
    "x00000000xx0000xx0000000000x\n" +
    "xxxxx0000xx0000xx0000000000x\n" +
    "xxxxx0000xx0000xx0000000000x\n" +
    "xxxxx0000xx0000xxxxxxxxxxxxx\n" +
    "xxxxx0000xx0000xxxxxxxxxxxxx\n" +
    "x00000000xx0000000000000000x\n" +
    "x00000000xx0000000000000000x\n" +
    "x00000000xx0000000000000000x\n" +
    "x00000000xx0000000000000000x\n" +
    "x0000xxxxxxxxxxxxxxxxxx0000x\n" +
    "x0000xxxxxxxxxxxxxxxxxx0000x\n" +
    "x00000000000000000000000000x\n" +
    "x00000000000000000000000000x\n" +
    "x00000000000000000000000000x\n" +
    "x00000000000000000000000000x\n" +
    "xxxxxxxxxxxxxxxxxxxxxxxxxxxx\n";

let room = new Room(scuti,{ tilemap: tilemap5

    , tileColor: 0x989865, wallColor: 0xB6B8C7 });