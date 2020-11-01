import {Tile} from "./Tile.js";
import {Map} from "./Map";
import {Room} from "./Room";

export class RoomGenerator {
    static execute(app, floor, tileHeight) {
        // 000
        // 000
        // 000
        let map = new Map(floor).generate();
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * map[y][x]
                }
                console.log(map[y][x]);
                map[y][x] = new Tile(coords, tileHeight);
            }
        }
        console.log(map);
        return new Room(app, map);
    }
}