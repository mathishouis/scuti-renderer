import * as PIXI from 'pixi.js';
import {Log} from "../../util/logger/Logger";

export class TileCursor extends PIXI.Graphics {
    constructor(container) {
        super();

        this.container = container;
        this.cursorLoader = new PIXI.Loader("http://127.0.0.1:8081/furnitures/", 2);
        this.initCursor();
    }

    initCursor() {

        // Temporary, i need to redo all the loader lmao



        if(this.cursorLoader.resources['TileCursor']) {
            Log('Tile cursor is already loaded!', 'info')
        } else {
            this.cursorLoader.add('TileCursor', 'TileCursor.png');
        }

        this.cursorLoader.load(() => {
            console.log(this.cursorLoader.resources['TileCursor']);
            this.cursor = new PIXI.Sprite(this.cursorLoader.resources['TileCursor'].texture);
            this.cursor.zIndex = 800


            this.container.addChild(this.cursor);
            this.container.updateTransform();
        });

    }

    set(positions) {
        this.cursor.x = positions.x;
        this.cursor.y = positions.y;
    }

    visibility(state) {
        this.cursor.alpha = state;
    }
}