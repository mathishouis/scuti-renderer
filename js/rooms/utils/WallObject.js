import * as PIXI from 'pixi.js';

export class WallObject extends PIXI.Graphics {
    constructor(container, coords, tileThickness, wallHeight, direction, tileHeight, zMax) {
        super();

        this.container = container;
        this.coords = coords;
        this.tileThickness = tileThickness;
        this.wallHeight = wallHeight;
        this.direction = direction;
        this.tileHeight = tileHeight;
        this.zMax = zMax;
    }

    draw() {
        switch(this.direction) {
            case 'l':
                this.coords.x = this.coords.x + 24
                this.coords.y = this.coords.y - this.wallHeight * 123 + this.tileHeight * 32 + 12 - this.zMax * 32
                this.first = {x: this.coords.x, y: this.coords.y};
                this.second = {x: this.coords.x + 32, y: this.coords.y - 16};
                this.third = {x: this.second.x + 8, y: this.first.y - 12};
                this.fourth = {x: this.second.x - 24, y: this.first.y + 4};

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
                this.first = {x: this.coords.x, y: this.coords.y};
                this.second = {x: this.coords.x + 8, y: this.coords.y + 4};
                this.third = {
                    x: this.second.x,
                    y: this.second.y + 123 * this.wallHeight - this.tileHeight * 32 + this.zMax * 32 + this.tileThickness
                };
                //this.third = { x: this.second.x, y: this.second.y + 123 * this.wallHeight };
                this.fourth = {x: this.third.x - 8, y: this.third.y - 4};

                this.beginFill("0xBBBECD");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.lineStyle({
                    color: "0x90929E",
                });
                this.first = {x: this.coords.x + 8, y: this.coords.y + 4};
                this.second = {x: this.first.x + 32, y: this.first.y - 16};
                this.third = {
                    x: this.second.x,
                    y: this.second.y + 123 * this.wallHeight - this.tileHeight * 32 + this.zMax * 32 + this.tileThickness
                };
                //this.third = { x: this.second.x, y: this.second.y + 123 * this.wallHeight };
                this.fourth = {x: this.third.x - 32, y: this.third.y + 16};

                this.beginFill("0x90929E");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();
                this.container.addChild(this);
                break;
            case 'r':
                this.coords.x = this.coords.x + 24
                this.coords.y = this.coords.y - this.wallHeight * 123 + this.tileHeight * 32 + 12 - this.zMax * 32
                this.first = {x: this.coords.x, y: this.coords.y};
                this.second = {x: this.coords.x + 32, y: this.coords.y + 16};
                this.third = {x: this.second.x + 8, y: this.first.y + 12};
                this.fourth = {x: this.second.x - 24, y: this.first.y - 4};

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
                this.first = {x: this.coords.x, y: this.coords.y};
                this.second = {x: this.coords.x + 32, y: this.coords.y + 16};
                this.third = {
                    x: this.second.x,
                    y: this.second.y + 123 * this.wallHeight - this.tileHeight * 32 + this.zMax * 32 + this.tileThickness
                };
                //this.third = { x: this.second.x, y: this.second.y + 123 * this.wallHeight };
                this.fourth = {x: this.third.x - 32, y: this.third.y - 16};

                this.beginFill("0xBBBECD");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.lineStyle({
                    color: "0x90929E",
                });
                this.first = {x: this.coords.x + 32, y: this.coords.y + 16};
                this.second = {x: this.first.x + 8, y: this.first.y - 4};
                this.third = {
                    x: this.second.x,
                    y: this.second.y + 123 * this.wallHeight - this.tileHeight * 32 + this.zMax * 32 + this.tileThickness
                };
                //this.third = { x: this.second.x, y: this.second.y + 123 * this.wallHeight };
                this.fourth = {x: this.third.x - 8, y: this.third.y + 4};

                this.beginFill("0x90929E");
                this.moveTo(this.first.x, this.first.y);
                this.lineTo(this.second.x, this.second.y);
                this.lineTo(this.third.x, this.third.y);
                this.lineTo(this.fourth.x, this.fourth.y);
                this.endFill();

                this.container.addChild(this);
                break;
            case 'c':
                this.coords.x = this.coords.x + 24
                this.coords.y = this.coords.y - this.wallHeight * 123 + this.tileHeight * 32 + 12 - this.zMax * 32
                this.first = {x: this.coords.x, y: this.coords.y};
                this.second = {x: this.coords.x + 8, y: this.coords.y - 4};
                this.third = {x: this.second.x + 8, y: this.second.y + 4};
                this.fourth = {x: this.third.x - 8, y: this.third.y + 4};

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


                this.container.addChild(this);
                break;
        }
    }
}