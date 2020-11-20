import * as PIXI from 'pixi.js';
import {client} from "../../../../main";

export class DoorObject extends PIXI.Graphics {
    constructor(container, coords) {
        super();

        this.coords = coords;
        this.container = container;

        this.textureLoader = client.getTextureLoader();
    }

    drawTile(floorMaterial) {
        let floorMaterialInfo = this.textureLoader.paperData.paper_floor[floorMaterial];

        this.textureLoader.initTexture(floorMaterialInfo.textureId + '_HabboRoomContent_floor_texture_64_' + floorMaterialInfo.colorable + '_floor_' + floorMaterialInfo.textureName);

        let tile = new PIXI.Container();

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

        var drawTile = (() => {

            let floorMaterial = PIXI.Texture.from(this.textureLoader.textureLoader.resources[floorMaterialInfo.textureId + '_HabboRoomContent_floor_texture_64_' + floorMaterialInfo.colorable + '_floor_' + floorMaterialInfo.textureName].url);

            let top = new PIXI.Graphics()
                .beginTextureFill({ texture: floorMaterial, color: PIXI.utils.premultiplyTint(floorMaterialInfo.textureColor, 0.9999), matrix: new PIXI.Matrix(1, 0.5, 1, -0.5, this.coords.x, this.coords.y)})
                .moveTo(this.first.x, this.first.y)
                .lineTo(this.second.x, this.second.y)
                .lineTo(this.third.x, this.third.y)
                .lineTo(this.fourth.x, this.fourth.y)
                .lineTo(this.first.x, this.first.y)
                .endFill();

            tile.addChild(top);


        });

        if(this.textureLoader.textureLoader.loading) {
            this.textureLoader.textureLoader.onComplete.add((loader, res) => {
                drawTile();
            });
        } else {
            drawTile();
        }

        tile.interactive = true;

        tile.mouseover = ((mouseData) => {
            client.getCurrentRoom().tileCursor.visibility(1);
            client.getCurrentRoom().tileCursor.set({x: this.coords.x - 24, y: this.coords.y + 48});
        });

        tile.mouseout = ((mouseData) => {
            client.getCurrentRoom().tileCursor.visibility(0);
        });

        tile.click = ((mouseData) => {
        });

        this.container.addChild(tile);
    }

    drawWall(wallThickness, tileThickness, tileHeight, zMax, wallMaterial) {

        let wall = new PIXI.Container();

        let wallMaterialInfo = this.textureLoader.paperData.paper_wall[wallMaterial];

        this.textureLoader.initTexture(wallMaterialInfo.textureId + '_HabboRoomContent_wall_texture_64_' + wallMaterialInfo.colorable + '_wall_' + wallMaterialInfo.textureName);

        this.wallThickness = wallThickness;
        this.tileThickness = tileThickness;
        this.tileHeight = tileHeight;
        this.zMax = zMax;
        this.coords.x = this.coords.x - this.wallThickness + 32
        this.coords.y = this.coords.y - this.wallThickness / 2 + this.tileThickness - 70
        this.first = { x: this.coords.x, y: this.coords.y - 37 - this.zMax * 32 + this.tileHeight * 32};
        this.second = { x: this.first.x + 32, y: this.first.y - 16 };
        this.third = { x: this.second.x + this.wallThickness, y: this.second.y + this.wallThickness / 2 };
        this.fourth = { x: this.third.x - 32, y: this.third.y + 16 };

        this.thikness = {
            first: { x: this.first.x, y: this.first.y },
            second: { x: this.first.x, y: this.first.y + 37 + this.zMax * 32 - this.tileHeight * 32 },
            third: { x: this.fourth.x , y: this.fourth.y + 37 + this.zMax * 32 - this.tileHeight * 32 },
            fourth: { x: this.third.x, y: this.third.y + 37 + this.zMax * 32 - this.tileHeight * 32 },
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

            let right = new PIXI.Graphics()
                .beginTextureFill({ texture: wallMaterial, color: PIXI.utils.premultiplyTint(wallMaterialInfo.textureColor, 0.8), matrix: new PIXI.Matrix(1, 0.5, 0, 1, this.coords.x, this.coords.y - (123 + this.zMax * 32 - this.tileHeight * 32))})
                .moveTo(this.fourth.x, this.fourth.y)
                .lineTo(this.thikness.third.x, this.thikness.third.y)
                .lineTo(this.thikness.fourth.x, this.thikness.fourth.y)
                .lineTo(this.third.x, this.third.y)
                .lineTo(this.fourth.x, this.fourth.y)
                .endFill();

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