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



    let room = new Room(scuti, {
        tilemap: tilemap

        , floorMaterial: 110, wallMaterial: 1501
    });


    let avatar = new Avatar(scuti, {
        x: 5,
        y: 5,
        z: 2,
        direction: 2,
        headDirection: 2,
        figure: "hr-100-61.hd-180-7.ch-210-66.lg-270-82.sh-290-80",
        action: "wlk"
    });
    room.addRoomObject(avatar);

    room.tileClick = (x, y, z) => {
        avatar.move(x, y, z);
    }

    room.tileOut = (x, y, z) => {

    }

    room.tileOver = (x, y, z) => {

    }

}
load();