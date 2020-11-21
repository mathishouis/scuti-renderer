import * as PIXI from 'pixi.js';
import {Log} from "../../../../util/logger/Logger";

export class TileCursor extends PIXI.Graphics {
    constructor(container) {
        super();

        this.container = container;
        this.cursorLoader = new PIXI.Loader("http://127.0.0.1:8081/room/", 2);
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
            this.cursor.alpha = 0


            this.container.addChild(this.cursor);
            this.container.updateTransform();
        });

    }

    set(positions) {
        this.cursor.x = positions.x;
        this.cursor.y = positions.y;
        this.cursor.zIndex = (positions.x + positions.y)*2.4
    }

    visibility(state) {
        this.cursor.alpha = state;
    }
}