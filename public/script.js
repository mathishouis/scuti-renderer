import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";
import {FloorFurniture} from "../src/objects/furniture/FloorFurniture";
import {Avatar} from "../src/objects/avatar/Avatar";
import {Action} from "../src/enum/Action";
import {WallFurniture} from "../src/objects/furniture/WallFurniture";

let action = "move";

async function load() {
    var element = document.createElement("input");
    element.setAttribute("type", "button");
    element.setAttribute("value", "Placer des mobis");
    element.setAttribute("name", "button3");
    element.setAttribute("style", "position: fixed; z-index: 100; padding: 8px 14px; margin: 10px 10px;");
    document.getElementById("app").appendChild(element);


    let scuti = new Scuti({
        canvas: document.getElementById("app"),
        width: 1920,
        height: 955,
        //resources: "https://scuti-resources.netlify.app/",
        background: 0x000000,
        resources: "http://localhost:8081/"
    });
    scuti.onEvent = (event) => {
        console.log(event);
    }
    await scuti.initialise();

    let tilemap =
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

    let tilemap2 ="xxxxxxxxxxxx\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxx000000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxxxxxxxxxx\n" +
        "xxxxxxxxxxxx\n"



    let room = new Room(scuti, {
        tilemap: tilemap

        , floorMaterial: 110, wallMaterial: 1501
    });

    room.heightmap = tilemap2;

    //let furniId = [3901, 3902, 3903, 3904, 3898, 3899, 3900, 3896, 3895, 3892, 3891, 3890, 3889, 3888, 3887, 3886, 3893, 3894, 1620, 1621, 1622, 1623, 1624, 1625, 1626, 1627, 1628, 1619, 13]
    let randomRotation = [0, 2, 4, 6];
    let furniId = [3886, 1620];

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
    let actions = ["std", "wlk", "sml", "wav", "agr", "srp", "eyb", "crr", "drk"];

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

    let avatar = new Avatar(scuti, {
        x: 5,
        y: 5,
        z: 2,
        direction: 2,
        headDirection: 2,
        //figure: figure,
        figure: "hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80",
        actions: [ Action.Walk]
    });

    room.addRoomObject(avatar);
    avatar.handItem = 55;
    //:avatar.addAction(Action.UseItem);
    avatar.addAction(Action.Wave);

    let wallFurniture = new WallFurniture(scuti, {

        x: 3,
        y: 7,
        offsetX: 8,
        offsetY: 36,
        id: 4625,
        direction: 2,
    });
    room.addRoomObject(wallFurniture);
    setTimeout(() => {
        room.removeRoomObject(wallFurniture);
    }, 5000);
    let wallFurniture2 = new WallFurniture(scuti, {
        x: 3,
        y: 8,
        offsetX: 8,
        offsetY: 36,
        id: 4625,
        direction: 2,
    });
    room.addRoomObject(wallFurniture2);

    let wallFurniture3 = new WallFurniture(scuti, {
        x: 4,
        y: 0,
        offsetX: 14,
        offsetY: 41,
        id: 4066,
        direction: 4,
        state: 3,
    });
    room.addRoomObject(wallFurniture3);

    let wallFurniture4 = new WallFurniture(scuti, {
        x: 3,
        y: 10,
        offsetX: 5,
        offsetY: 48,
        id: 4075,
        direction: 2,
        state: 1
    });
    room.addRoomObject(wallFurniture4);

    let wallFurniture5 = new WallFurniture(scuti, {
        x: 3,
        y: 5,
        offsetX: 13,
        offsetY: 12,
        id: 4071,
        direction: 2,
        state: 1
    });
    room.addRoomObject(wallFurniture5);

    let wallFurniture6 = new WallFurniture(scuti, {
        x: 3,
        y: 2,
        offsetX: 9,
        offsetY: 47,
        id: 4333,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture6);

    let wallFurniture7 = new WallFurniture(scuti, {
        x: 8,
        y: 0,
        offsetX: 1,
        offsetY: 10,
        id: 4333,
        direction: 4,
        state: 0
    });
    room.addRoomObject(wallFurniture7);
    /*let wallFurniture = new WallFurniture(scuti, {
        x: 3,
        y: 11,
        offsetX: 14,
        offsetY: 27,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture);
    let wallFurniture1 = new WallFurniture(scuti, {
        x: 3,
        y: 12,
        offsetX: 0,
        offsetY: 34,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture1);
    let wallFurniture2 = new WallFurniture(scuti, {
        x: 3,
        y: 3,
        offsetX: 5,
        offsetY: 32,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture2);
    let wallFurniture3 = new WallFurniture(scuti, {
        x: 3,
        y: 2,
        offsetX: 15,
        offsetY: 27,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture3);
    let wallFurniture4 = new WallFurniture(scuti, {
        x: 3,
        y: 8,
        offsetX: 6,
        offsetY: 31,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture4);
    let wallFurniture5 = new WallFurniture(scuti, {
        x: 3,
        y: 9,
        offsetX: 11,
        offsetY: 29,
        id: 4235,
        direction: 2,
        state: 0
    });
    room.addRoomObject(wallFurniture5);*/

    let furni = new FloorFurniture(scuti, {
        x: 0,
        y: 0,
        z: 0,
        direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
        id: furniId[Math.floor(Math.random() * furniId.length)],
        state: 1,
    });
    room.addRoomObject(furni);

    room.tileClick = (x, y, z) => {
        if(action === "move") {
            avatar.handItem = Math.floor(Math.random() * 150);
            avatar.move(x, y, z, true);
        } else {
            furni.move(x, y, z, true);
        }
    }

    element.onclick = () => {
        if(action === "place") {
            action = "move";
            element.value = "Placer des mobis";
        } else {
            action = "place";
            element.value = "Déplacer mon personnage"
        }
    }

}
load();