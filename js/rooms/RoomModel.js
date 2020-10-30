import * as PIXI from 'pixi.js';
import {Application} from 'pixi.js';

export class RoomModel extends PIXI.Graphics {
    constructor(canvas) {
        super();

        this.canvas = canvas;


    }

    drawTile(coords, tileHeight) {
        this.first = { x: coords.x, y: coords.y };
        this.second = { x: coords.x + 32, y: coords.y - 16 };
        this.third = { x: this.second.x + 32, y: this.first.y };
        this.fourth = { x: this.second.x, y: this.first.y + 16 };
        this.thikness = {
            first: { x: this.first.x, y: this.first.y },
            second: { x: this.first.x, y: this.first.y + tileHeight },
            third: { x: this.fourth.x , y: this.fourth.y + tileHeight },
            fourth: { x: this.third.x, y: this.third.y + tileHeight },
            fifth: { x: this.third.x, y: this.third.y },
            sixth: { x: this.fourth.x , y: this.fourth.y }
        };

        this.lineStyle({
            width: 0.5,
            color: "0x8E8E5E",
            alignment: 0,
        });
        this.beginFill("0x989865");
        this.moveTo(this.first.x, this.first.y);
        this.lineTo(this.second.x, this.second.y);
        this.lineTo(this.third.x, this.third.y);
        this.lineTo(this.fourth.x, this.fourth.y);
        this.lineTo(this.first.x, this.first.y);
        this.endFill();

        // thik
        this.lineStyle(1, "0x7A7A51");
        this.beginFill("0x838357");
        this.moveTo(this.thikness.first.x, this.thikness.first.y);
        this.lineTo(this.thikness.second.x, this.thikness.second.y);
        this.lineTo(this.thikness.third.x, this.thikness.third.y);
        this.lineTo(this.fourth.x, this.fourth.y);
        this.endFill();

        this.lineStyle(1, "0x676744");
        this.beginFill("0x6F6F49");
        this.moveTo(this.fourth.x, this.fourth.y);
        this.lineTo(this.thikness.third.x, this.thikness.third.y);
        this.lineTo(this.thikness.fourth.x, this.thikness.fourth.y);
        this.lineTo(this.third.x, this.third.y);
        this.lineStyle({ width: 0 })
        this.lineTo(this.fourth.x, this.fourth.y);
        this.canvas.addChild(this);
    }

    drawWall(coords, wallHeight, type, tileHeight) {
        switch(type) {
            case 'left':
                coords.x = coords.x + 24
                coords.y = coords.y - wallHeight * 123 + tileHeight * 32 + 20
                this.first = { x: coords.x, y: coords.y };
                this.second = { x: coords.x + 32, y: coords.y - 16 };
                this.third = { x: this.second.x + 8, y: this.first.y - 12 };
                this.fourth = { x: this.second.x - 24, y: this.first.y + 4};

                this.lineStyle({
                    width: 0.5,
                    color: "0x6F717A",
                    alignment: 0,
                });
                this.beginFill("0x6F717A");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.lineTo(this.first.x, this.first.y);
                this.endFill();


                this.lineStyle({
                    color: "0xBBBECD",
                });
                this.first = { x: coords.x, y: coords.y };
                this.second = { x: coords.x + 8, y: coords.y + 4 };
                //this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight - tileHeight * 32};
                this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight };
                this.fourth = { x: this.third.x - 8, y: this.third.y - 4};

                this.beginFill("0xBBBECD");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.lineStyle({
                    color: "0x90929E",
                });
                this.first = { x: coords.x + 8, y: coords.y + 4 };
                this.second = { x: this.first.x + 32, y: this.first.y - 16 };
                //this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight - tileHeight * 32};
                this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight };
                this.fourth = { x: this.third.x - 32, y: this.third.y + 16};

                this.beginFill("0x90929E");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();
                this.canvas.addChild(this);
                break;
            case 'right':
                coords.x = coords.x + 24
                coords.y = coords.y - wallHeight * 123 + tileHeight * 32 + 20
                this.first = { x: coords.x, y: coords.y };
                this.second = { x: coords.x + 32, y: coords.y + 16 };
                this.third = { x: this.second.x + 8, y: this.first.y + 12 };
                this.fourth = { x: this.second.x - 24, y: this.first.y - 4};

                this.lineStyle({
                    width: 0.5,
                    color: "0x6F717A",
                    alignment: 0,
                });
                this.beginFill("0x6F717A");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.lineTo(this.first.x, this.first.y);
                this.endFill();

                this.lineStyle({
                    color: "0xBBBECD",
                });
                this.first = { x: coords.x, y: coords.y };
                this.second = { x: coords.x + 32, y: coords.y + 16 };
                //this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight - tileHeight * 32};
                this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight };
                this.fourth = { x: this.third.x - 32, y: this.third.y - 16};

                this.beginFill("0xBBBECD");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.lineStyle({
                    color: "0x90929E",
                });
                this.first = { x: coords.x + 32, y: coords.y + 16 };
                this.second = { x: this.first.x + 8, y: this.first.y - 4 };
                //this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight - tileHeight * 32};
                this.third = { x: this.second.x, y: this.second.y + 123 * wallHeight };
                this.fourth = { x: this.third.x - 8, y: this.third.y + 4};

                this.beginFill("0x90929E");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.canvas.addChild(this);
                break;
            case 'corner':
                coords.x = coords.x + 24
                coords.y = coords.y - wallHeight * 123 + tileHeight * 32 + 20
                this.first = { x: coords.x, y: coords.y };
                this.second = { x: coords.x + 8, y: coords.y - 4 };
                this.third = { x: this.second.x + 8, y: this.second.y + 4 };
                this.fourth = { x: this.third.x - 8, y: this.third.y + 4};

                this.lineStyle({
                    width: 0.5,
                    color: "0x6F717A",
                    alignment: 0,
                });
                this.beginFill("0x6F717A");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.lineTo(this.first.x, this.first.y);
                this.endFill();



                this.canvas.addChild(this);
                break;
        }

    }

    getCoords() {
        return { x: this.x, y: this.y };
    }
}