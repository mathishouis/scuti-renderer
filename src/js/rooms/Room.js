import * as PIXI from 'pixi.js';
import {client} from "../main";

export class Room extends PIXI.Container {
    constructor(app, map) {
        super();

        this.map = map;


        //this.display(app);
        //this.setDrag(app);
    }

    getTile(coords) {
        return this.map[coords.y][coords.x];
    }

    drawTiles() {
        for(let y = 0; y < this.map.length; y++) {
            for(let x = 0; x < this.map[y].length; x++) {
                this.map[y][x].draw(this);
            }
        }
    }

    display(app) {
        this.x = app.screen.width / 2;
        this.y = app.screen.height / 2;
        app.stage.addChild(this);
    }

    setDrag(app) {
        let draggingMode;
        let clickCoords;
        let roomCoordsSave;


        app.on("mouseup", (event) => {
            draggingMode = false;
        });

        app.on("mouseupoutside", (event) => {
            draggingMode = false;
        });

        app.on("mousemove", (event) => {
            if(draggingMode) {
                let dx = event.data.global.x - clickCoords.x;
                let dy = event.data.global.y - clickCoords.y;
                this.x = roomCoordsSave.x + dx;
                this.y = roomCoordsSave.y + dy;
            }
        });

        app.on("mousedown", (event) => {
            draggingMode = true;
            clickCoords = {
                x: event.data.global.x,
                y: event.data.global.y
            };
            roomCoordsSave = {
                x: this.x,
                y: this.y
            };
        });
    }
}