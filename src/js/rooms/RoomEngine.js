import { RoomModel } from './RoomModel'
import { Room } from "./Room";
import { RoomFurnitureManager } from "./furnitures/RoomFurnitureManager";
import { TileObject } from "./utils/TileObject";
import { WallObject } from "./utils/WallObject";
import { StairObject } from "./utils/StairObject";
import { client} from "../main";
import { RoomFurnitureLoader } from "./furnitures/RoomFurnitureLoader";
import { TileCursor} from "./utils/TileCursor";
import {Log} from "../util/logger/Logger";


export class RoomEngine {
    constructor(app, container, room) {

        this.app = app;
        this.container = container
        this.room = room;
        this.roomFurnitureManager = new RoomFurnitureManager();
        this.furnitures = room.furnitures;
        this.tileThickness = room.tileThickness;
        this.wallHeight = room.wallHeight;
        this.zMax = 0;
        //this.tileCursor = new TileCursor(this.container, this.generateMap(this.room.floor));

        this.roomDragging();
    }

    renderRoom() {
        this.destroyRoom();

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

    destroyRoom() {
        for (var i = this.container.children.length - 1; i >= 0; i--) {	this.container.removeChild(this.container.children[i]);}
    }

    renderFurni() {

            this.furnitures.forEach((furni, i) => {
                this.roomFurnitureManager.addFurni(furni.id, furni.baseId, furni.positions, furni.direction, furni.state, this.container);
            });
            this.furnitures.forEach((furni, i) => {
                this.roomFurnitureManager.drawFurni(furni.id, furni.baseId, furni.positions, furni.direction, furni.state, this.container);
            });



    }

    generateMap(model) {
        let matrix;
        let lines = 0;
        matrix = [[]];
        for(let i = 0; i < model.length; i++) {
            if(model[i] === "\n" || model[i] === "\r") {
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

    roomDragging() {

        let draggingMode;
        let clickCoords;
        let roomCoordsSave;

        this.container.on("mouseup", (event) => {
            draggingMode = false;
        });

        this.container.on("mouseupoutside", (event) => {
            draggingMode = false;
        });

        this.container.on("mousemove", (event) => {
            if(draggingMode) {
                let dx = event.data.global.x - clickCoords.x;
                let dy = event.data.global.y - clickCoords.y;
                this.container.x = roomCoordsSave.x + dx;
                this.container.y = roomCoordsSave.y + dy;
            }
        });

        this.container.on("mousedown", (event) => {
            draggingMode = true;
            clickCoords = {
                x: event.data.global.x,
                y: event.data.global.y
            };
            roomCoordsSave = {
                x: this.container.x,
                y: this.container.y
            };
        });
    }




}