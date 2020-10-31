import * as PIXI from 'pixi.js';

export class RoomFurnitureLoader extends PIXI.Graphics {
    constructor() {
        super();

        this.furnitureLoader = new PIXI.Loader("http://127.0.0.1:8081/", 2);
    }

    isLoaded(furniName) {
        return !!this.furnitureLoader.resources[furniName];
    }

    loadFurni(furniName) {
        this.furnitureLoader.add(furniName, furniName+'/'+furniName+'.json');
    }

    getFurni(furniName) {
        return this.furnitureLoader.resources[furniName].data;
    }

    getProperty(furniName) {
        return this.getFurni(furniName).furniProperty
    }
}