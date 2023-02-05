import { Scuti } from "../src/Scuti";
import {Room} from "../src/objects/rooms/Room";
import {FloorMaterial} from "../src/objects/rooms/materials/FloorMaterial";
import {WallMaterial} from "../src/objects/rooms/materials/WallMaterial";
import {FloorFurniture} from "../src/objects/furnitures/FloorFurniture";

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
        tileMap: tileMap2,
        /*floorMaterial: new FloorMaterial(renderer, 110),
        wallMaterial: new WallMaterial(renderer, 1501)*/
        floorMaterial: new FloorMaterial(renderer, 307),
        wallMaterial: new WallMaterial(renderer, 1501)
    });
    const furniture = new FloorFurniture({
        id: 1619,
        position: {
            x: 1,
            y: 0,
            z: 0
        },
        direction: 4,
        state: 1
    });
    room.visualization.onTileClick = (position) => {
        console.log("click", position);
        /*if(furniture.direction === 4) {
            furniture.direction = 2
        } else {
            furniture.direction = 4;
        }*/
        furniture.pos = {
            x: position.x,
            y: position.y,
            z: position.z,
        }
    }
    room.visualization.onTileOver = (position) => {
        console.log("over", position);
    }
    room.visualization.onTileOut = (position) => {
        console.log("out", position);
    }
    room.addRoomObject(furniture)
})();
