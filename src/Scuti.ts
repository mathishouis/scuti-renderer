import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application } from 'pixi.js';

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;

    constructor(private configuration: IEngineConfiguration) {

        this._canvas = configuration.canvas;
        this._application = new Application({
            width: configuration.width,
            height: configuration.height,
            backgroundColor: 0x000000,
        });
        this._canvas.appendChild(this._application.view);

    }

    private initManager(): void {

    }

    public get application(): Application {
        return this._application;
    }

}