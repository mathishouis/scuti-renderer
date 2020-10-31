import * as PIXI from 'pixi.js';
import furniData from './../../../furnitures/furnidata.json';

export class RoomFurniture extends PIXI.Graphics {
    constructor(id, baseId, position, direction, state, container) {
        super();
        this.id = id;
        this.baseId = baseId;
        this.position = position;
        this.direction = direction;
        this.state = state;
        this.canvas = container;
    }

    getLayers() {
        // Obtenir le nb de layers avec le fichier json
    }

    drawFurni() {


        // Faites pas attention à ça ptdr

        var furniName = furniData[this.baseId].asset;
        var furniBaseTexture = new PIXI.BaseTexture("./furnitures/" + furniName + "/" + furniName + ".png");



    }
}