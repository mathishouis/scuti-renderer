import * as PIXI from 'pixi.js';

export class Loader extends PIXI.Graphics {
    constructor() {
        super();

        this.Loader = new PIXI.Loader("http://127.0.0.1:8081/", 2);
    }

    isLoaded(textureName) {
        return !!this.Loader.resources[textureName];
    }

    addTexture(textureName) {
        if(!this.isLoaded(textureName)) {
            this.Loader.add(textureName, textureName+'.png');
            this.Loader.load();
        }
    }




    getTexture(textureName) {
        return this.Loader.resources[textureName];
    }

    getLoader() {
        return this.Loader;
    }

}