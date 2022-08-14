import { Scuti } from "../src/Scuti";
import { Room } from "../src/objects/room/Room";
import {FloorFurniture} from "../src/objects/furniture/FloorFurniture";


async function load() {

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
        "xxxxxxxxxxxx\n" +
        "xxxxxxxxxxxx\n"



    let room = new Room(scuti, {
        tilemap: tilemap

        , floorMaterial: 110, wallMaterial: 1501
    });

    dice(scuti, room, 5, 5, 0);
    dice(scuti, room, 6, 5, 0);
    dice(scuti, room, 7, 5, 0);
    dice(scuti, room, 7, 6, 0);
    dice(scuti, room, 5, 6, 0);

    room.tileClick = (x, y, z) => {
        console.log("cc");
    }


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
        if(furni5.logic === "furniture_dice") {
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