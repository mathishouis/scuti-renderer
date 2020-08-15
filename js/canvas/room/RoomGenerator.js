import { Tile } from "./Tile.js";
import { Room } from "./Room.js"

export class RoomGenerator {
    static generate(modelData, tileHeight) {
         const model = RoomGenerator.convertToMatrix(modelData);
         let initialX = 0;
         let initialY = 0;
         let tiles = [];
         let tile;
         for(let y = 0 ; y < model.length ; y++) {
            tiles.push([])
             for(let x = 0; x < model[y].length; x++) {
                 tile = new Tile({
                     x: initialX + (x + 1) * 32 - (y+1) * 32,
                     y: initialY + (x + 1) * 16 + (y+1) * 16
                 }, tileHeight)
                 tiles[y].push(tile);
                 if(parseInt(model[y][x]) == 0) {
                     tile.draw();
                 } else {
                    //TODO: stairs
                 }
             }
         }
         return new Room(tiles);
    }

    static convertToMatrix(modelData) {
        let matrix = [[]];
        let line = 0;
        for(let i = 0; i < modelData.length; i++) {
            if(modelData[i] == "\n") {
                matrix.push([]);
                line++
            } else {
                matrix[line].push(modelData[i]);
            }
        }
        console.log(matrix)
        return matrix;
    }

    static test() {
        console.log("test");
    }
}