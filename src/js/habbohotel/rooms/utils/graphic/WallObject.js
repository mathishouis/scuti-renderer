import * as PIXI from 'pixi.js';
import {TextureLoader} from "../textures/TextureLoader";
import {Log} from "../../../../util/logger/Logger";
import {client} from "../../../../main";

export class WallObject extends PIXI.Graphics {
    constructor(container, coords, tileThickness, wallThickness, wallHeight, direction, tileHeight, zMax, sideMap, wallMaterial) {
        super();

        this.container = container;
        this.coords = coords;
        this.tileThickness = tileThickness;
        this.wallThickness = wallThickness;
        this.wallHeight = wallHeight;
        this.direction = direction;
        this.tileHeight = tileHeight;
        this.zMax = zMax;
        this.sideMap = sideMap;
        this.wallMaterial = wallMaterial;

        this.textureLoader = client.getTextureLoader();
    }

    draw() {

        let wall = new PIXI.Container();

        let wallMaterialInfo = this.textureLoader.paperData.paper_wall[this.wallMaterial];

        this.textureLoader.initTexture(wallMaterialInfo.textureId + '_HabboRoomContent_wall_texture_64_' + wallMaterialInfo.colorable + '_wall_' + wallMaterialInfo.textureName);

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

        var drawWall = (() => {

            let wallMaterial = PIXI.Texture.from(this.textureLoader.textureLoader.resources[wallMaterialInfo.textureId + '_HabboRoomContent_wall_texture_64_' + wallMaterialInfo.colorable + '_wall_' + wallMaterialInfo.textureName].url);

            let top = new PIXI.Graphics()
                .beginFill("0xFFFFFF")
                .moveTo(this.first.x, this.first.y)
                .lineTo(this.second.x, this.second.y)
                .lineTo(this.third.x, this.third.y)
                .lineTo(this.fourth.x, this.fourth.y)
                .lineTo(this.first.x, this.first.y)
                .endFill();

            top.tint = PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.61);
            wall.addChild(top);

            let left = new PIXI.Graphics();
            if(this.direction === 'r') {
                left.beginTextureFill({ texture: wallMaterial, color: PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.9999), matrix: new PIXI.Matrix(1, 0.5, 0, 1, this.coords.x, this.coords.y - (123 + this.zMax * 32 - this.tileHeight * 32))})
            } else {
                left.beginFill("0xFFFFFF")
                left.tint = PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.9999);
            }
            left.moveTo(this.thikness.first.x, this.thikness.first.y)
            left.lineTo(this.thikness.second.x, this.thikness.second.y)
            left.lineTo(this.thikness.third.x, this.thikness.third.y)
            left.lineTo(this.fourth.x, this.fourth.y)
            left.endFill();

            if(this.sideMap === 'x' && this.direction === 'l' || this.direction === 'r') {
                wall.addChild(left);
            }

            let right = new PIXI.Graphics();
            if(this.direction === 'l') {
                right.beginTextureFill({ texture: wallMaterial, color: PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.8), matrix: new PIXI.Matrix(1, -0.5, 0, 1, this.coords.x + this.wallThickness, this.coords.y - (123 + this.zMax * 32 - this.tileHeight * 32) + this.wallThickness / 2)})
            } else {
                right.beginFill("0xFFFFFF")
                right.tint = PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.8);
            }
            right.moveTo(this.fourth.x, this.fourth.y)
            right.lineTo(this.thikness.third.x, this.thikness.third.y)
            right.lineTo(this.thikness.fourth.x, this.thikness.fourth.y)
            right.lineTo(this.third.x, this.third.y)
            right.lineTo(this.fourth.x, this.fourth.y)
            right.endFill();

            wall.addChild(right);

        });

        if(this.textureLoader.textureLoader.loading) {
            this.textureLoader.textureLoader.onComplete.add((loader, res) => {
                drawWall();
            });
        } else {
            drawWall();
        }

        this.container.addChild(wall);
    }


}