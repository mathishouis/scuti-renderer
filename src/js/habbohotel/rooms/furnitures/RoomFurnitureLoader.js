import * as PIXI from 'pixi.js';
import {Log} from "../../../util/logger/Logger";

export class RoomFurnitureLoader extends PIXI.Graphics {
    constructor() {
        super();

        this.furnitureLoader = new PIXI.Loader("http://127.0.0.1:8081/furnitures/", 2);
        this.furniData = undefined
    }

    isLoaded(furniName) {
        return !!this.furnitureLoader.resources[furniName];
    }

    loadFurni(furniName) {
        this.furnitureLoader.add(furniName, furniName+'/'+furniName+'.json');

    }

    loadFurnidata() {
        if(!this.isLoaded('furnidata')) {
            Log('Loading furnidata', 'info')
            this.furnitureLoader.add('furnidata', 'furnidata.json');
            this.furnitureLoader.load(() => {
                this.furniData = this.furnitureLoader.resources['furnidata'].data
            });
        } else {
            Log('Furnidata is already loaded!', 'info')
        }
    }

    getFurni(furniName) {
        return this.furnitureLoader.resources[furniName];
    }

    getProperty(furniName) {
        return this.getFurni(furniName).data.furniProperty
    }
}