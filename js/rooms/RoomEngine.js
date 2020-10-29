import { RoomModel } from './RoomModel'
import { Room } from "./Room";

export class RoomEngine {
    constructor(canvas, room) {

        this.canvas = canvas
        this.room = room;

    }

    renderRoom() {
        let map = this.generateMap(this.room.floor);
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * map[y][x]
                }
                console.log(map[y][x]);
                map[y][x] = new RoomModel(this.canvas, coords, this.room.tileHeight).drawTile();
            }
        }

    }

    generateMap(model) {
        let matrix;
        let lines = 0;
        matrix = [[]];
        for(let i = 0; i < model.length; i++) {
            if(model[i] === "\n") {
                matrix.push([]);
                lines++;
            } else {
                matrix[lines].push(model[i]);
            }
        }
        return matrix;
    }


}