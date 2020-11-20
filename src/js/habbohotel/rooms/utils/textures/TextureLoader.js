import * as PIXI from 'pixi.js';
import {Log} from "../../../../util/logger/Logger";

export class TextureLoader extends PIXI.Graphics {
    constructor() {
        super();

        this.textureLoader = new PIXI.Loader("http://127.0.0.1:8081/room/spaces/", 2);
        this.paperData = undefined
    }

    initTexture(textureName) {
        if(this.textureLoader.loading) {
            this.textureLoader.onComplete.add((loader, res) => {
                if (!this.isLoaded(textureName)) {
                    this.addTexture(textureName);
                }
            });
        } else {
            if (!this.isLoaded(textureName)) {
                this.addTexture(textureName);
            }

        }
    }

    isLoaded(textureName) {
        return !!this.textureLoader.resources[textureName];
    }

    addTexture(textureName) {
        if(!this.isLoaded(textureName)) {
            this.textureLoader.add(textureName, textureName+'.png');
            this.textureLoader.load();
        }
        console.log("Loader progress: " + this.textureLoader.progress + "/" + this.textureLoader.concurrency);
    }

    loadPaperdata() {
        if(!this.isLoaded('paperdata')) {
            Log('Loading paperdata', 'info')
            this.textureLoader.add('paperdata', 'paperdata.json');
            this.textureLoader.load(() => {
                this.paperData = this.textureLoader.resources['paperdata'].data
            });
        } else {
            Log('Paperdata is already loaded!', 'info')
        }
    }

}