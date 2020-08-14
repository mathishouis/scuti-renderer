import * as PIXI from 'pixi.js';
import { app, container } from "./../../main.js";

export class Tile extends PIXI.Graphics {
    constructor(coords, tileHeight) {
        super();
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
    }

    draw(stairs=false) {
        if(!stairs) {
            // Tile top
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

            container.addChild(this);
        } else {
            //todo: stairs
        }
    }

    getCoords() {
        return { x: this.x, y: this.y };
    }
}