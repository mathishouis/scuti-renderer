import { RoomModel } from './RoomModel'
import { Room } from "./Room";
import { RoomFurnitureManager } from "./furnitures/RoomFurnitureManager";

export class RoomEngine {
    constructor(canvas, room) {

        this.canvas = canvas
        this.room = room;
        this.roomFurnitureManager = new RoomFurnitureManager();
        this.furnitures = room.furnitures;

    }

    renderRoom() {
        let map = this.generateMap(this.room.floor);
        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * map[y][x]
                }

                // Generate walls (to finish)
                if(x > 0 && y > 0) {
                    //if(map[y - 1][x] == 'x') {
                    //    new RoomModel(this.canvas).drawWall(coords, 1);
                    //}
                    if(map[y][x - 1] == 'x') {
                        new RoomModel(this.canvas).drawWall({x: coords.x - 32, y: coords.y - 16}, 1);
                    }

                }

                // Generate floor
                new RoomModel(this.canvas).drawTile(coords, this.room.tileHeight);


            }
        }
        new Room(this.canvas, map);
        //return this.renderFurni()

    }

    renderFurni() {
        var that = this;
        this.furnitures.forEach(function(furni) {
            that.roomFurnitureManager.addFurni(furni.id, furni.baseId, furni.position, furni.direction, furni.state, that.canvas);
        });
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