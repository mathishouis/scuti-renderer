import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application } from 'pixi.js';

export class Scuti {

    private canvas: HTMLElement;
    private application: Application;

    constructor(private configuration: IEngineConfiguration) {

        this.canvas = configuration.canvas;
        this.application = new Application({
            width: configuration.width,
            height: configuration.height,
            backgroundColor: 0x000000,
        });
        this.canvas.appendChild(this.application.view);

    }

}