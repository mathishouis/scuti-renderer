import { RoomModel } from './RoomModel'
import { Room } from "./Room";
import { RoomFurnitureManager } from "./furnitures/RoomFurnitureManager";

export class RoomEngine {
    constructor(canvas, room) {

        this.canvas = canvas
        this.room = room;
        this.roomFurnitureManager = new RoomFurnitureManager();
        this.furnitures = room.furnitures;
        this.maxTile = 0;
    }

    renderRoom() {
        var map = this.generateMap(this.room.floor);


        this.highestTile();
        this.roomModel = new RoomModel(this.canvas, this.maxTile, 1);


        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * map[y][x]
                }

                // Generate walls (to finish)
                if(x > 0 && y > 0) {
                    // Corner walls
                    if(map[y - 1][x - 1] == 'x' && map[y - 1][x] == 'x' && map[y][x - 1] == 'x' && map[y][x] != 'x') {
                        this.roomModel.drawWall({x: coords.x, y: coords.y - 32}, 'corner', map[y][x]);
                    }
                    // Left walls
                    if(map[y][x - 1] == 'x' && map[y][x] != 'x') {
                        this.roomModel.drawWall({x: coords.x - 32, y: coords.y - 16}, 'left', map[y][x]);
                    }
                    // Right walls
                    if(map[y - 1][x] == 'x' && map[y][x] != 'x') {
                        this.roomModel.drawWall({x: coords.x + 8, y: coords.y - 28}, 'right', map[y][x]);
                    }

                    if(map[y][x] != 'x') {
                        if (map[y][x - 1] == parseInt(map[y][x]) + 1) {
                            // xxx
                            // xx0
                            // xxx
                            this.roomModel.drawStair({x: coords.x - 8, y: coords.y - 36}, this.room.tileHeight, 'right')
                        } else if (map[y - 1][x] == parseInt(map[y][x]) + 1) {
                            // xxx
                            // xxx
                            // x0x
                            this.roomModel.drawStair({x: coords.x + 32, y: coords.y - 48}, this.room.tileHeight, 'bottom')
                        } else {
                            this.roomModel.drawTile(coords, this.room.tileHeight);
                        }
                    }
                }




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

    highestTile(map) {
        var mapValue = this.generateMap(this.room.floor);
        var finalMapValue = []
        const heightMap = {
            0: 0,
            x: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9
        }
        for(let y = 0; y < mapValue.length; y++) {
            for (let x = 0; x < mapValue[y].length; x++) {
                mapValue[y][x] = heightMap[mapValue[y][x]]
            }
        }
        for(let y = 0; y < mapValue.length; y++) {
            finalMapValue.push(Math.max.apply(Math, mapValue[y]))
        }
        this.maxTile = Math.max.apply(Math, finalMapValue);
    }



}