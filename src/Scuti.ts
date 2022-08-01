import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application, settings, SCALE_MODES } from 'pixi.js';
import { ResourceManager } from "./resources/ResourceManager";

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;
    private _resourceManager: ResourceManager;

    constructor(private configuration: IEngineConfiguration) {

        this.initialise(configuration);

    }

    public get application(): Application {
        return this._application;
    }

    public get resources(): ResourceManager {
        return this._resourceManager;
    }

    public async initialise(configuration: IEngineConfiguration): Promise<void> {
        this._resourceManager = new ResourceManager(configuration.resources);

        this._canvas = configuration.canvas;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;
        this._application = new Application({
            width: configuration.width,
            height: configuration.height,
            backgroundColor: 0x000000,
            antialias: false,
        });
        this._canvas.appendChild(this._application.view);
    }

}