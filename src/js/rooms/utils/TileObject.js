import * as PIXI from 'pixi.js';
import {client} from "../../main";

export class TileObject extends PIXI.Graphics {
    constructor(container, coords, tileThickness) {
        super();

        this.coords = coords;
        this.container = container;
        this.tileThickness = tileThickness;
    }

    draw() {
        this.first = { x: this.coords.x, y: this.coords.y };
        this.second = { x: this.coords.x + 32, y: this.coords.y - 16 };
        this.third = { x: this.second.x + 32, y: this.first.y };
        this.fourth = { x: this.second.x, y: this.first.y + 16 };
        this.thikness = {
            first: { x: this.first.x, y: this.first.y },
            second: { x: this.first.x, y: this.first.y + this.tileThickness },
            third: { x: this.fourth.x , y: this.fourth.y + this.tileThickness },
            fourth: { x: this.third.x, y: this.third.y + this.tileThickness },
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
        this.container.addChild(this);
        this.interactive = true;

        this.mouseover = function(mouseData) {
            client.getCurrentRoom().tileCursor.visibility(1);
            client.getCurrentRoom().tileCursor.set({x: this.coords.x, y: this.coords.y - 18});
        }

        this.mouseout = function(mouseData) {
            client.getCurrentRoom().tileCursor.visibility(0);
        }

        this.click = function(mouseData) {
        }
    }

}