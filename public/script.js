import { Scuti } from "../src/Scuti";
import {Room} from "../src/objects/rooms/Room";
import {FloorMaterial} from "../src/objects/rooms/materials/FloorMaterial";
import {WallMaterial} from "../src/objects/rooms/materials/WallMaterial";
import {FloorFurniture} from "../src/objects/furnitures/FloorFurniture";
import {WallFurniture} from "../src/objects/furnitures/WallFurniture";
import {Avatar} from "../src/objects/avatars/Avatar";
import {AvatarAction} from "../src/objects/avatars/actions/AvatarAction";

(async ()=>{
    const renderer = new Scuti({
        canvas: document.getElementById("app"),
        width: window.innerWidth,
        height: window.innerHeight,
        resources: './resources'
    });
    await renderer.loadResources();

    const tileMap =
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

    const tileMap1 = "xxxxxx\n" +
        "x4444432110011111x\n" +
        "x444443211001xx00x\n" +
        "0000000011001xx00x\n" +
        "x0000000000000000x\n" +
        "x0001000000000000x\n" +
        "x0000000000000000x\n" +
        "x000000000xx00000x\n" +
        "x000000000x000000x\n" +
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

    const tileMap2 = "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "00000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n" +
        "x0000000000000000x\n";

    const tileMap3 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
        "x222222222222222222222222222x\n" +
        "x222222222222222222222222222x\n" +
        "2222222222222222222222222222x\n" +
        "x222222222222222222222222222x\n" +
        "x2222xxxxxx222222xxxxxxx2222x\n" +
        "x2222xxxxxx111111xxxxxxx2222x\n" +
        "x2222xx111111111111111xx2222x\n" +
        "x2222xx111111111111111xx2222x\n" +
        "x2222xx11xxx1111xxxx11xx2222x\n" +
        "x2222xx11xxx0000xxxx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x22222111x00000000xx11xx2222x\n" +
        "x2222xx11xxxxxxxxxxx11xx2222x\n" +
        "x2222xx11xxxxxxxxxxx11xx2222x\n" +
        "x2222xx111111111111111xx2222x\n" +
        "x2222xx111111111111111xx2222x\n" +
        "x2222xxxxxxxxxxxxxxxxxxx2222x\n" +
        "x2222xxxxxxxxxxxxxxxxxxx2222x\n" +
        "x222222222222222222222222222x\n" +
        "x222222222222222222222222222x\n" +
        "x222222222222222222222222222x\n" +
        "x222222222222222222222222222x\n" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    const tileMap4 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
        "xeeeeeeeeeeeeeeeedcba9888888888888\n" +
        "xeeeeeeeeeeeeeeeexxxxxx88888888888\n" +
        "xeeeeeeeeeeeeeeeexxxxxx88888888888\n" +
        "xeeeeeeeeeeeeeeeexxxxxx88888888888\n" +
        "xeeeeeeeeeeeeeeeexxxxxx88888888888\n" +
        "xdxxxxxxxxxxxxxxxxxxxxx88888888888\n" +
        "xcxxxxxxxxxxxxxxxxxxxxx88888888888\n" +
        "xbxxxxxxxxxxxxxxxxxxxxx88888888888\n" +
        "xaxxxxxxxxxxxxxxxxxxxxx88888888888\n" +
        "aaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx\n" +
        "xaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx\n" +
        "xaaaaaaaaaaaaaaaaxxxxxxxxxxxxxxxxx\n" +
        "xaaaaaaaaaaaaaaaaxxxx6666666666666\n" +
        "xaaaaaaaaaaaaaaaaxxxx6666666666666\n" +
        "xaaaaaaaaaaaaaaaaxxxx6666666666666\n" +
        "xaaaaaaaaaaaaaaaaxxxx6666666666666\n" +
        "xaaaaaaaaaaaaaaaaxxxx6666666666666\n" +
        "xaaaaaaaaaaaaaaaa98766666666666666\n" +
        "xaaaaaaaaaaaaaaaaxxxxxxxxxxxx5xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxxxxxxxxxxx4xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxxxxxxxxxxx3xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xaaaaaaaaaaaaaaaaxxx3333333333xxxx\n" +
        "xxxxxxxxxxxxxxxx9xxx3333333333xxxx\n" +
        "xxxxxxxxxxxxxxxx8xxx3333333333xxxx\n" +
        "xxxxxxxxxxxxxxxx7xxx3333333333xxxx\n" +
        "xxx777777777xxxx6xxx3333333333xxxx\n" +
        "xxx777777777xxxx5xxxxxxxxxxxxxxxxx\n" +
        "xxx777777777xxxx4xxxxxxxxxxxxxxxxx\n" +
        "xxx777777777xxxx3xxxxxxxxxxxxxxxxx\n" +
        "xxx777777777xxxx2xxxxxxxxxxxxxxxxx\n" +
        "xfffffffffxxxxxx1xxxxxxxxxxxxxxxxx\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xfffffffffxxxxxx111111111111111111\n" +
        "xxxxxxxxxxxxxxxx111111111111111111\n" +
        "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

    const room = new Room(renderer, {
        tileMap: tileMap4,
        /*floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1501)*/
        //floorMaterial: new FloorMaterial(renderer, 307),
        floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1601)
    });
    const furniture = new FloorFurniture({
        id: 1619,
        position: {
            x: 7,
            y: 5,
            z: 0
        },
        direction: 4,
        state: 1
    });
    const furniture2 = new FloorFurniture({
        id: 3895,
        position: {
            x: 7,
            y: 5,
            z: 0
        },
        direction: 4,
        state: 1
    });
    const wallFurniture = new WallFurniture({
        position: {
            x: 1,
            y: 0,
            offsetX: 8,
            offsetY: 36,
        },
        state: 0,
        id: 4625,
        direction: 2,
    });
    const wallFurniture2 = new WallFurniture({
        position: {
            x: 1,
            y: 3,
            offsetX: 8,
            offsetY: 36,
        },
        state: 0,
        id: 4625,
        direction: 2,
    });
    const wallFurniture3 = new WallFurniture({
        position: {
            x: 4,
            y: 0,
            offsetX: 14,
            offsetY: 41,
        },
        id: 4066,
        direction: 4,
        state: 3,
    });
    const avatar = new Avatar({
        figure: "hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80",
        position: {
            x: 4,
            y: 4,
            z: 0
        },
        bodyDirection: 2,
        headDirection: 2,
        actions: [
            //AvatarAction.Idle,
            //AvatarAction.Walk,
            AvatarAction.Talk,
            AvatarAction.Wave,
            AvatarAction.Walk,
            AvatarAction.CarryItem,
        ]
    });

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
    let actions = [AvatarAction.Default, AvatarAction.Walk, AvatarAction.GestureSmile, AvatarAction.Wave, AvatarAction.GestureAngry, AvatarAction.GestureSurprised, AvatarAction.Respect, AvatarAction.CarryItem, AvatarAction.UseItem]

    for(let y=0; y<2; y++) {
        for(let x=0; x<2; x++) {
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
            let randomAvatar = new Avatar({
                position: {
                    x: x + 1,
                    y: y,
                    z: 0,
                },
                bodyDirection: 2,
                headDirection: 2,
                figure: figure,
                actions: [actions[Math.floor(Math.random() * actions.length)]]
            });
            room.objects.add(randomAvatar);
        }
    }

    room.objects.add(avatar);
    room.objects.add(furniture2);
    room.visualization.onTileClick = (position) => {
        console.log("click", position);
        /*if(furniture.direction === 4) {
            furniture.direction = 2
        } else {
            furniture.direction = 4;
        }*/
        avatar.pos = {
            x: position.x,
            y: position.y,
            z: position.z,
        }
        wallFurniture.pos = {
            x: 1,
            y: Math.floor(Math.random() * (10 - 1 + 1) + 1),
            offsetX: 8,
            offsetY: 36
        }
    }
    room.visualization.onTileOver = (position) => {
        console.log("over", position);
    }
    room.visualization.onTileOut = (position) => {
        console.log("out", position);
    }
    //room.addRoomObject(furniture);
    //room.addRoomObject(wallFurniture);
    //room.addRoomObject(wallFurniture2);
    //room.addRoomObject(wallFurniture3);
})();
