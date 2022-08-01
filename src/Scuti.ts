import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application, settings, SCALE_MODES } from 'pixi.js';
import { ResourceManager } from "./resources/ResourceManager";
import { RoomMaterialManager } from "./objects/room/RoomMaterialManager";
import {EventManager} from "./objects/events/EventManager";
import {FurnitureManager} from "./objects/furniture/FurnitureManager";

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;

    private _resourceManager: ResourceManager;
    private _roomMaterialManager: RoomMaterialManager;
    private _eventManager: EventManager;
    private _furnitureManager: FurnitureManager;

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

    public get materials(): RoomMaterialManager {
        return this._roomMaterialManager;
    }

    public get furnitures(): FurnitureManager {
        return this._furnitureManager;
    }

    public get events(): EventManager {
        return this._eventManager;
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
            this._roomMaterialManager = new RoomMaterialManager(this);
            this._eventManager = new EventManager();
            this._furnitureManager = new FurnitureManager(this);
            await this._resourceManager.initialise();
            await this._roomMaterialManager.initialise();
            await this._eventManager.initialise();
            await this._furnitureManager.initialise();
            resolve();
        });
    }

}