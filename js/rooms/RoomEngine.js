import { RoomModel } from './RoomModel'
import { Room } from "./Room";
import { RoomFurnitureManager } from "./furnitures/RoomFurnitureManager";
import { TileObject } from "./utils/TileObject";
import { WallObject } from "./utils/WallObject";
import { StairObject } from "./utils/StairObject";
import { RoomFurnitureLoader } from "./furnitures/RoomFurnitureLoader";


export class RoomEngine {
    constructor(container, room) {

        this.container = container
        this.room = room;
        this.roomFurnitureManager = new RoomFurnitureManager();
        this.furnitures = room.furnitures;
        this.tileThickness = room.tileThickness;
        this.wallHeight = room.wallHeight;
        this.zMax = 0;
    }

    renderRoom() {
        var map = this.generateMap(this.room.floor);


        this.highestTile();
        this.roomModel = new RoomModel(this.container, this.zMax, this.wallHeight, this.tileThickness);


        for(let y = 0; y < map.length; y++) {
            for(let x = 0; x < map[y].length; x++) {
                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * map[y][x]
                }

                // Generate walls & stairs (to finish)
                if(x > 0 && y > 0) {
                    // Corner walls
                    if(map[y - 1][x - 1] == 'x' && map[y - 1][x] == 'x' && map[y][x - 1] == 'x' && map[y][x] != 'x') {
                        //this.roomModel.drawWall({x: coords.x, y: coords.y - 32}, 'corner', map[y][x]);
                        new WallObject(this.container, {x: coords.x, y: coords.y - 32}, this.tileThickness, this.wallHeight, 'c', map[y][x], this.zMax).draw();
                    }
                    // Left walls
                    if(map[y][x - 1] == 'x' && map[y][x] != 'x') {
                        new WallObject(this.container, {x: coords.x - 32, y: coords.y - 16}, this.tileThickness, this.wallHeight, 'l', map[y][x], this.zMax).draw();
                    }
                    // Right walls
                    if(map[y - 1][x] == 'x' && map[y][x] != 'x') {
                        new WallObject(this.container, {x: coords.x + 8, y: coords.y - 28}, this.tileThickness, this.wallHeight, 'r', map[y][x], this.zMax).draw();
                    }

                    // Stairs
                    if(map[y][x] != 'x') {
                        if (map[y][x - 1] == parseInt(map[y][x]) + 1) {
                            // xxx
                            // xx0
                            // xxx
                            new StairObject(this.container, {x: coords.x - 8, y: coords.y - 36}, this.tileThickness, 'r').draw();
                        } else if (map[y - 1][x] == parseInt(map[y][x]) + 1) {
                            // xxx
                            // xxx
                            // x0x
                            new StairObject(this.container, {x: coords.x + 32, y: coords.y - 48}, this.tileThickness, 'b').draw();
                        } else {
                            new TileObject(this.container, coords, this.tileThickness).draw();
                        }
                    }
                }




            }
        }

        return this.renderFurni()

    }

    renderFurni() {
        var that = this;
        this.furnitures.forEach(function(furni) {
            that.roomFurnitureManager.addFurni(furni.id, furni.baseId, furni.position, furni.direction, furni.state, that.container);
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
        this.zMax = Math.max.apply(Math, finalMapValue);
    }



}