import * as PIXI from 'pixi.js';

export class TileCursor extends PIXI.Graphics {
    constructor(container, map) {
        super();

        this.container = container;
        this.map = map;
        this.cursorMovement();
    }

    cursorMovement() {
        let cursorLoader = new PIXI.Loader("http://127.0.0.1:8081/", 2);
        cursorLoader.add('TileCursor', 'TileCursor.png');

        cursorLoader.load(() => {
            console.log(cursorLoader.resources['TileCursor']);
            this.cursor = new PIXI.Sprite(cursorLoader.resources['TileCursor'].texture);
            this.cursor.zIndex = 800

            this.container.addChild(this.cursor);
            this.container.updateTransform();
        });

        this.container.on("mousemove", (event) => {
            const positions = {
                x: event.data.global.x - this.container.x,
                y: event.data.global.y - this.container.y
            }

            const innerPositions = {
                x: positions.x * 0.5 + positions.y - (6 * 32) / 2,
                y: positions.x * -0.5 + positions.y + (10 * 32) / 2,
            }

            const coordinates = {
                y: Math.floor(innerPositions.y / 32) - 4,
                x: Math.floor(innerPositions.x / 32) + 3
            }

            if(coordinates.y > 0 && coordinates.x > 0) {
                if (this.map[coordinates.y][coordinates.x] == '0') {
                    console.log(this.map[coordinates.y][coordinates.x])
                    const coords = {
                        x: 32 * coordinates.x - 32 * coordinates.y,
                        y: 16 * coordinates.x + 16 * coordinates.y - 20
                    }
                    this.cursor.x = coords.x
                    this.cursor.y = coords.y
                }
            }

        });
    }

    drawCursor() {

    }
}