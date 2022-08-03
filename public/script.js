import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";
import {FloorFurniture} from "../src/objects/furniture/FloorFurniture";
import {Avatar} from "../src/objects/avatar/Avatar";

async function load() {
    let scuti = new Scuti({
        canvas: document.getElementById("app"),
        width: 1920,
        height: 955,
        resources: "http://localhost:8081/"
    });
    await scuti.initialise();

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

    let tilemap7 =
        "xxxxxxxxxxxxxxxxxxx\n" +
        "xxxxxxxxxxx22222222\n" +
        "xxxxxxxxxxx22222222\n" +
        "xxxxxxxxxxx22222222\n" +
        "xxxxxxxxxx222222222\n" +
        "xxxxxxxxxxx22222222\n" +
        "xxxxxxxxxxx22222222\n" +
        "x222222222222222222\n" +
        "x222222222222222222\n" +
        "x222222222222222222\n" +
        "x222222222222222222\n" +
        "x222222222222222222\n" +
        "x222222222222222222\n" +
        "x2222xxxxxxxxxxxxxx\n" +
        "x2222xxxxxxxxxxxxxx\n" +
        "x2222211111xx000000\n" +
        "x222221111110000000\n" +
        "x222221111110000000\n" +
        "x2222211111xx000000\n" +
        "xx22xxx1111xxxxxxxx\n" +
        "xx11xxx1111xxxxxxxx\n" +
        "x1111xx1111xx000000\n" +
        "x1111xx111110000000\n" +
        "x1111xx111110000000\n" +
        "x1111xx1111xx000000\n" +
        "xxxxxxxxxxxxxxxxxxx\n";

    let tilemap8 =
        "xxxxxxxxxxxxxxxxx\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "00000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "x0000000000000000\n" +
        "xxxxxxxxxxxxxxxxx\n";


    let room = new Room(scuti, {
        tilemap: tilemap8

        , floorMaterial: 110, wallMaterial: 1501 // 1901
    });

    //let furniId = [1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1619, 3901, 13];
    //let furniId = [3886];
    //let furniId = [3901, 3902, 3903, 3904, 3898, 3899, 3900, 3896, 3895, 3892, 3891, 3890, 3889, 3888, 3887, 3886, 3893, 3894]
    let furniId = [3901, 3902, 3903, 3904, 3898, 3899, 3900, 3896, 3895, 3892, 3891, 3890, 3889, 3888, 3887, 3886, 3893, 3894, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1619, 13]
    //let furniId = [3890];
    let randomRotation = [0, 2, 4, 6];

    let hd = [180, 185, 190, 195, 200, 205];
    let hr = [100, 105, 110, 115, 125, 135, 145, 155, 165, 170];
    let ch = [210, 215, 220, 225, 230, 235, 240, 245, 250, 255];
    let sh = [290, 295, 300, 305, 725, 730, 735, 740, 905, 906, 907, 908];
    let ha = [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027];
    let lg = [270, 275, 280, 285, 281, 695, 696, 716, 700, 705, 710, 715, 720, 827];
    let wa = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];
    let ea = [1401, 1402, 1403, 1404, 1405, 1406];
    let color = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    let color2 = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];
    let color3 = [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110];
    let actions = ["std", "wlk", "sml", "wav", "agr", "srp", "eyb", "crr", "drk"]

    for(let y=0; y<10; y++) {
        for(let x=0; x<10; x++) {
            let figure = "hr-" +
                hr[Math.floor(Math.random() * hr.length)] + "-" + color2[Math.floor(Math.random() * color2.length)]
                + ".hd-" +
                hd[Math.floor(Math.random() * hd.length)] + "-" + color[Math.floor(Math.random() * color.length)]
                + ".ch-" +
                ch[Math.floor(Math.random() * ch.length)] + "-" + color3[Math.floor(Math.random() * color3.length)]
                + ".lg-" +
                lg[Math.floor(Math.random() * lg.length)] + "-" + color3[Math.floor(Math.random() * color3.length)]
                + ".sh-" +
                sh[Math.floor(Math.random() * sh.length)] + "-" + color3[Math.floor(Math.random() * color3.length)]
                + ".ha-" +
                ha[Math.floor(Math.random() * ha.length)] + "-" + color3[Math.floor(Math.random() * color3.length)]
                + ".wa-" +
                wa[Math.floor(Math.random() * wa.length)] + "-" + color3[Math.floor(Math.random() * color3.length)]
                + ".ea-" +
                ea[Math.floor(Math.random() * ea.length)] + "-" + color3[Math.floor(Math.random() * color3.length)];
            let randomAvatar = new Avatar(scuti, {
                x: x + 1,
                y: y + 1,
                z: 0,
                direction: 2,
                headDirection: 2,
                figure: figure,
                action: actions[Math.floor(Math.random() * actions.length)]
            });
            room.addRoomObject(randomAvatar);
        }
    }

    for(let y=0; y<10; y++) {
        for (let x = 0; x < 6; x++) {
            let furni = new FloorFurniture(scuti, {
                x: x + 11,
                y: y + 1,
                z: 0,
                direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
                id: furniId[Math.floor(Math.random() * furniId.length)],
                state: 1,
            });
            room.addRoomObject(furni);
        }
    }

    for(let y=0; y<16; y++) {
        for (let x = 0; x < 16; x++) {
            let furni = new FloorFurniture(scuti, {
                x: x + 1,
                y: y + 11,
                z: 0,
                direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
                id: furniId[Math.floor(Math.random() * furniId.length)],
                state: 1,
            });
            room.addRoomObject(furni);
        }
    }

    /*let avatar = new Avatar(scuti, {
        x: 5,
        y: 5,
        z: 2,
        direction: 2,
        headDirection: 2,
        figure: "hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80",
        action: "wlk"
    });
    room.addRoomObject(avatar);*/

    room.tileClick = (x, y, z) => {
        console.log("click", x, y, z);
        let furni = new FloorFurniture(scuti, {
            x: x,
            y: y,
            z: z,
            direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
            id: furniId[Math.floor(Math.random() * furniId.length)],
            state: 1,
        });
        room.addRoomObject(furni);
        //avatar.move(x, y, z);
    }

    /*let furni = new FloorFurniture(scuti, {
        x: 5,
        y: 5,
        z: 2,
        direction: 2,
        id: 13,
        state: 0,
    });
    room.addRoomObject(furni);*/
    room.tileOver = (x, y, z) => {
        //console.log("over", x, y, z);
    }
    room.tileOut = (x, y, z) => {
        //console.log("out", x, y, z);
    }
}
load();