import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application, settings, SCALE_MODES } from 'pixi.js';
import { ResourceManager } from "./resources/ResourceManager";
import {RoomMaterials} from "./objects/room/RoomMaterials";

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;
    private _resourceManager: ResourceManager;
    private _roomMaterials: RoomMaterials;
    private _configuration: IEngineConfiguration;

    constructor(private configuration: IEngineConfiguration) {

        this._configuration = configuration;

    }

    public get application(): Application {
        return this._application;
    }

    public get resources(): ResourceManager {
        return this._resourceManager;
    }

    public get materials(): RoomMaterials {
        return this._roomMaterials;
    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this._canvas = this._configuration.canvas;
            settings.SCALE_MODE = SCALE_MODES.NEAREST;

            this._application = new Application({
                width: this._configuration.width,
                height: this._configuration.height,
                backgroundColor: 0x000000,
                antialias: false,
            });
            this._canvas.appendChild(this._application.view);

            this._resourceManager = new ResourceManager(this._configuration.resources);
            this._roomMaterials = new RoomMaterials(this);
            await this._resourceManager.initialise();
            console.log("Resources Manager initialised");
            await this._roomMaterials.initialise();
            resolve();
        });
    }

}