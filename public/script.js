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

    const tileMap = "xxxxxxxxxxxxxxxxxxxxxxxxxxx\n" +
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
        "x2222xx00111100xxxxxxxxxxxx\n" +
        "x2222xx00000000xxxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx\n" +
        "x2222x0000000000xxxxxxxxxxx"

    const room = new Room(renderer, {
        tileMap: tileMap,
        /*floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1501)*/
        //floorMaterial: new FloorMaterial(renderer, 307),
        floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1601)
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
        ],
        handItem: 55
    });
    room.objects.add(avatar);
    room.tiles.onPointerDown = (position) => {
        console.log("click", position);
    }
    room.tiles.onDoubleClick = (position) => {
        console.log("dblclick", position);
    }
    room.tiles.onPointerOver = (event) => {
        avatar.pos = event.position;
    }
    dice(room, 5, 5, 2);
    dice(room, 5, 6, 1);
    dice(room, 6, 5, 2);
    dice(room, 7, 5, 2);
    dice(room, 7, 6, 1);
    const furniture = new FloorFurniture({
        id: 1619,
        position: {
            x: 8,
            y: 5,
            z: 0
        },
        direction: 4,
        state: 0
    });
    furniture.onPointerDown = () => {
        if(furniture.wiredSelected) {
            furniture.wiredSelected = false;
        } else {
            furniture.wiredSelected = true;
        }
    }
    room.objects.add(furniture);
    /*const furniture = new FloorFurniture({
        id: 1619,
        position: {
            x: 7,
            y: 5,
            z: 0
        },
        direction: 4,
        state: 1
    });*/
})();

function dice(room, x, y, z) {
    let furni5 = new FloorFurniture({
        position: {
            x: x,
            y: y,
            z: z,
        },
        //direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
        direction: 4,
        //id: furniId[Math.floor(Math.random() * furniId.length)],
        id: 284,
        state: 1,
    });
    room.objects.add(furni5);
    let timeout = undefined;
    furni5.onDoubleClick = (event) => {
        console.log(event);
        //if(furni5.infos.logic === "furniture_dice") {
            console.log("clicked furni5", event);
            if(event.tag === "activate") {
                clearTimeout(timeout);
                furni5.state = -1;
                timeout = setTimeout(() => {
                    furni5.state = Math.floor(Math.random() * 6) + 1;
                }, 1000);
                /*setTimeout(() => {
                    furni5.state = 0
                }, 2000);*/
            } else {
                clearTimeout(timeout);
                furni5.state = 0;
            }
        //x@}
    }
}
