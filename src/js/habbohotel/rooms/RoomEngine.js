
import { RoomFurnitureManager } from "./furnitures/RoomFurnitureManager";
import { TileObject } from "./utils/graphic/TileObject";
import { WallObject } from "./utils/graphic/WallObject";
import { StairObject } from "./utils/graphic/StairObject";
import { TileCursor} from "./utils/graphic/TileCursor";
import {Log} from "../../util/logger/Logger";
import {WallGeometry} from "./utils/geometry/WallGeometry";
import {FloorGeometry} from "./utils/geometry/FloorGeometry";
import {DoorGeometry} from "./utils/geometry/DoorGeometry";
import {DoorObject} from "./utils/graphic/DoorObject";


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
        this.tileCursor = new TileCursor(this.container);

        this.roomDragging();
    }

    render() {

        this.container.x = this.app.screen.width / 2;
        this.container.y = this.app.screen.height / 2;

        this.destroy();

        this.map = this.generateMap(this.room.floor);



        this.floorGeometry = new FloorGeometry(this.generateMap(this.room.floor));
        this.wallGeometry = new WallGeometry(this.generateMap(this.room.floor));
        this.doorGeometry = new DoorGeometry(this.generateMap(this.room.floor));

        this.zMax = this.floorGeometry.highest();




        for(let y = 0; y < this.map.length; y++) {
            for(let x = 0; x < this.map[y].length; x++) {

                const coords = {
                    x: 32 * x - 32 * y,
                    y: 16 * x + 16 * y - 32 * this.map[y][x]
                }

                if(x > 0 && y > 0) {
                    if(this.floorGeometry.valid(x,y)) {
                        if(this.doorGeometry.valid(x,y)) {
                            new DoorObject(this.container, coords).drawTile();
                            new DoorObject(this.container, coords).drawWall(8, this.tileThickness, this.map[y][x], this.zMax);
                        } else {
                            // Walls
                            if(this.wallGeometry.corner(x,y)) {
                                new WallObject(this.container, {x: coords.x, y: coords.y}, this.tileThickness, 8, this.wallHeight, 'c', this.map[y][x], this.zMax).draw();
                            }
                            if(this.wallGeometry.left(x,y)) {
                                new WallObject(this.container, {x: coords.x, y: coords.y}, this.tileThickness, 8, this.wallHeight, 'l', this.map[y][x], this.zMax, this.map[y + 1][x]).draw();
                            }
                            if(this.wallGeometry.right(x,y)) {
                                new WallObject(this.container, {x: coords.x, y: coords.y}, this.tileThickness, 8, this.wallHeight, 'r', this.map[y][x], this.zMax, this.map[y][x + 1]).draw();
                            }
                            // Stairs
                            if (this.map[y][x - 1] == parseInt(this.map[y][x]) + 1) {
                                new StairObject(this.container, {x: coords.x - 8, y: coords.y - 36}, this.tileThickness, 'r').draw();
                            } else if (this.map[y - 1][x] == parseInt(this.map[y][x]) + 1) {
                                new StairObject(this.container, {x: coords.x + 32, y: coords.y - 48}, this.tileThickness, 'b').draw();
                            } else {
                                new TileObject(this.container, coords, this.tileThickness).draw();
                            }
                        }
                    }
                }
            }
        }

        return this.renderFurni()

    }

    destroy() {
        for (var i = this.container.children.length - 1; i >= 0; i--) {	this.container.removeChild(this.container.children[i]);}
    }

    renderFurni() {

            console.log(this.furnitures);

            this.furnitures.forEach((furni, i) => {
                console.log(furni);
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