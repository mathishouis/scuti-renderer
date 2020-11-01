import * as PIXI from 'pixi.js';

export class RoomCursor extends PIXI.Graphics {
    constructor(x, y) {
        super(coords);
        this.coords = coords;
        this.draw();
    }

    draw() {
        this.lineStyle(2, "0xFFFFF");
        this.moveTo()
    }
}