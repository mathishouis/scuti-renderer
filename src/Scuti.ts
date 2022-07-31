import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application } from 'pixi.js';
import { ResourceManager } from "./resources/ResourceManager";

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;
    private _resourceManager: ResourceManager;

    constructor(private configuration: IEngineConfiguration) {

        this._initManagers();

        this._canvas = configuration.canvas;
        this._application = new Application({
            width: configuration.width,
            height: configuration.height,
            backgroundColor: 0x000000,
        });
        this._canvas.appendChild(this._application.view);

    }

    public get application(): Application {
        return this._application;
    }

    private _initManagers(): void {
        this._resourceManager = new ResourceManager();
    }

    public get resources(): ResourceManager {
        return this._resourceManager;
    }

}