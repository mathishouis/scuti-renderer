import * as PIXI from 'pixi.js';

export class WallObject extends PIXI.Graphics {
    constructor(container, coords, tileThickness, wallThickness, wallHeight, direction, tileHeight, zMax) {
        super();

        this.container = container;
        this.coords = coords;
        this.tileThickness = tileThickness;
        this.wallThickness = wallThickness;
        this.wallHeight = wallHeight;
        this.direction = direction;
        this.tileHeight = tileHeight;
        this.zMax = zMax;
    }

    draw() {

        let wall = new PIXI.Container();
        let color = "0xB6B8C7";

        switch(this.direction) {
            case 'l':
                this.coords.x = this.coords.x - this.wallThickness
                this.coords.y = this.coords.y - this.wallThickness / 2 + this.tileThickness
                this.first = { x: this.coords.x, y: this.coords.y - 123 - this.zMax * 32 + this.tileHeight * 32};
                this.second = { x: this.first.x + 32, y: this.first.y - 16 };
                this.third = { x: this.second.x + this.wallThickness, y: this.second.y + this.wallThickness / 2 };
                this.fourth = { x: this.third.x - 32, y: this.third.y + 16 };
                break;
            case 'r':
                this.coords.x = this.coords.x + 32
                this.coords.y = this.coords.y - 16 + this.tileThickness
                this.first = { x: this.coords.x, y: this.coords.y - 123 - this.zMax * 32 + this.tileHeight * 32};
                this.second = { x: this.first.x + this.wallThickness, y: this.first.y - this.wallThickness / 2 };
                this.third = { x: this.second.x + 32, y: this.second.y + 16 };
                this.fourth = { x: this.third.x - this.wallThickness, y: this.third.y + this.wallThickness / 2 };
                break;
            case 'c':
                this.coords.x = this.coords.x + 32 - this.wallThickness
                this.coords.y = this.coords.y - 16 + this.tileThickness - this.wallThickness / 2
                this.first = { x: this.coords.x, y: this.coords.y - 123 - this.zMax * 32 + this.tileHeight * 32};
                this.second = { x: this.first.x + this.wallThickness, y: this.first.y - this.wallThickness / 2 };
                this.third = { x: this.second.x + this.wallThickness, y: this.second.y + this.wallThickness / 2 };
                this.fourth = { x: this.third.x - this.wallThickness, y: this.third.y + this.wallThickness / 2 };
                break;
        }

        this.thikness = {
            first: { x: this.first.x, y: this.first.y },
            second: { x: this.first.x, y: this.first.y + 123 + this.zMax * 32 - this.tileHeight * 32 },
            third: { x: this.fourth.x , y: this.fourth.y + 123 + this.zMax * 32 - this.tileHeight * 32 },
            fourth: { x: this.third.x, y: this.third.y + 123 + this.zMax * 32 - this.tileHeight * 32 },
            fifth: { x: this.third.x, y: this.third.y },
            sixth: { x: this.fourth.x , y: this.fourth.y }
        };

        let top = new PIXI.Graphics()
            .beginFill("0xFFFFFF")
            .moveTo(this.first.x, this.first.y)
            .lineTo(this.second.x, this.second.y)
            .lineTo(this.third.x, this.third.y)
            .lineTo(this.fourth.x, this.fourth.y)
            .lineTo(this.first.x, this.first.y)
            .endFill();

        let left = new PIXI.Graphics()
            .beginFill("0xFFFFFF")
            .moveTo(this.thikness.first.x, this.thikness.first.y)
            .lineTo(this.thikness.second.x, this.thikness.second.y)
            .lineTo(this.thikness.third.x, this.thikness.third.y)
            .lineTo(this.fourth.x, this.fourth.y)
            .endFill();

        let right = new PIXI.Graphics()
            .beginFill("0xFFFFFF")
            .moveTo(this.fourth.x, this.fourth.y)
            .lineTo(this.thikness.third.x, this.thikness.third.y)
            .lineTo(this.thikness.fourth.x, this.thikness.fourth.y)
            .lineTo(this.third.x, this.third.y)
            .lineTo(this.fourth.x, this.fourth.y)
            .endFill();

        // Todo: wall color system

        top.tint = PIXI.utils.premultiplyTint(color, 0.61);
        left.tint = PIXI.utils.premultiplyTint(color, 0.9999);
        right.tint = PIXI.utils.premultiplyTint(color, 0.8);

        wall.addChild(top);
        wall.addChild(right);
        wall.addChild(left);

        this.container.addChild(wall);
    }
}