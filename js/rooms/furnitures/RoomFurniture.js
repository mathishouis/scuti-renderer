import * as PIXI from 'pixi.js';
import furniData from './../../../furnitures/furnidata.json';

export class RoomFurniture extends PIXI.Graphics {
    constructor(id, baseId, position, direction, state, canvas) {
        super();
        this.id = id;
        this.baseId = baseId;
        this.position = position;
        this.direction = direction;
        this.state = state;
        this.canvas = canvas;
    }

    drawFurni() {


        // Faites pas attention à ça ptdr

        var furniName = furniData[this.baseId].asset;
        var furniBaseTexture = new PIXI.BaseTexture(`./../../../furnitures/${furniName}/${furniName}.png`);

        var furniJson = require("./../../../furnitures/" + furniName + "/" + furniName + ".json");

        var i;

        for (i = 0; i < furniJson.visualization.layerCount; i++) {

            var furniAsset = furniName + '_64_a_0_0';
            console.log("Layer: " + i)
            console.log("FurniName: " + furniName);
            console.log("FurniAsset: " + furniAsset);
            console.log("Asset: " + furniAsset)
            var furniTexture = new PIXI.Texture(furniBaseTexture, new PIXI.Rectangle(furniJson.assets[furniAsset].sprite.left, furniJson.assets[furniAsset].sprite.top, furniJson.assets[furniAsset].sprite.width, furniJson.assets[furniAsset].sprite.height));


            var furni = new PIXI.Sprite(furniTexture);
            furni.anchor.set(0.5);
            furni.zIndex = 100;
            this.canvas.addChild(furni);
            this.canvas.updateTransform();
        }

    }
}