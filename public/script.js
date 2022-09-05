import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";
import {FloorFurniture} from "../src/objects/furniture/FloorFurniture";
import {Avatar} from "../src/objects/avatar/Avatar";
import {Action} from "../src";
import {AvatarEffect} from "../src/objects/avatar/AvatarEffect";


async function load() {

    let scuti = new Scuti({
        canvas: document.getElementById("app"),
        width: 1920,
        height: 955,
        //resources: "https://scuti-resources.netlify.app/",
        background: 0x000000,
        resources: "http://localhost:8081/",
        transparent: false
    });
    scuti.onEvent = (event) => {
        console.log(event);
    }
    await scuti.initialise();


    let tilemap ="xxxxxxxxxxxx\n" +
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
        "xxxx00000000\n" +
        "xxxx00000000\n" +
        "xxxx00000000\n" +
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

    dice(scuti, room, 5, 5, 0);
    /*dice(scuti, room, 6, 5, 0);
    dice(scuti, room, 7, 5, 0);
    dice(scuti, room, 7, 6, 0);
    dice(scuti, room, 5, 6, 0);*/

    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 8, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 12, z: 0, direction: 0, id: 12, state: 1,}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 16, z: 0, direction: 0, id: 12, state: 2,}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 20, z: 0, direction: 0, id: 12, state: 0,}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 1, y: 20, z: 0, direction: 2, id: 12, state: 2}));
    room.addRoomObject(new FloorFurniture(scuti, {x: -3, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: -7, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: -11, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 20, z: 0, direction: 2, id: 12, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 16, z: 0, direction: 0, id: 12, state: 2}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 12, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 8, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 19, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 23, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 27, y: 20, z: 0, direction: 2, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 8, z: 0, direction: 0, id: 11, state: 4}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 12, z: 0, direction: 0, id: 11, state: 4}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 16, z: 0, direction: 0, id: 11, state: 3}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 20, z: 0, direction: 0, id: 11, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 4, z: 0, direction: 0, id: 11, state: 4}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: 0, z: 0, direction: 0, id: 11, state: 5}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 4, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: 0, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 4, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: 0, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: -4, z: 0, direction: 0, id: 12, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 15, y: -4, z: 0, direction: 2, id: 12, state: 2}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 19, y: -4, z: 0, direction: 0, id: 12, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: -4, z: 0, direction: 0, id: 12, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 1, y: -4, z: 0, direction: 2, id: 12, state: 2}));
    room.addRoomObject(new FloorFurniture(scuti, {x: -3, y: -4, z: 0, direction: 0, id: 12, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: -4, z: 0, direction: 0, id: 11, state: 0}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: -8, z: 0, direction: 0, id: 11, state: 6}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 9, y: -12, z: 0, direction: 0, id: 11, state: 4}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: -8, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 5, y: -12, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: -8, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 11, y: -12, z: 0, direction: 0, id: 12, state: 1}));
    room.addRoomObject(new FloorFurniture(scuti, {x: 15, y: 20, z: 0, direction: 2, id: 12, state: 2}));
    let avatar = new Avatar(scuti, {x: 7, y: 5, z: 2, direction: 2, headDirection: 2, figure: "hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80", actions: [ Action.Walk]});

    avatar.effect = new AvatarEffect(scuti, { id: 17});
    avatar.doubleClick = (event) => {
        console.log("Avatar double click!")
    }
    room.tileClick = (x, y, z) => {
        avatar.move(x, y, z, true);
    }
    room.addRoomObject(avatar);
    let dragon = new FloorFurniture(scuti, {x: 4, y: 4, z: 0, direction: 2, id: 1620, state: 1});
    dragon.doubleClick = (event) => {
        if(dragon.state === 1) {
            dragon.state = 0;
        } else {
            dragon.state = 1;
        }
    }
    room.addRoomObject(dragon);

}

function dice(scuti, room, x, y, z) {
    let furni5 = new FloorFurniture(scuti, {
        x: x,
        y: y,
        z: z,
        //direction: randomRotation[Math.floor(Math.random() * randomRotation.length)],
        direction: 4,
        //id: furniId[Math.floor(Math.random() * furniId.length)],
        id: 284,
        state: 1,
    });
    room.addRoomObject(furni5);
    let timeout = undefined;
    furni5.doubleClick = (event) => {
        console.log(event);
        if(furni5.infos.logic === "furniture_dice") {
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
        }
    }
}
load();