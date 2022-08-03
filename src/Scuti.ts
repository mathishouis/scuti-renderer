import { IEngineConfiguration } from "./interfaces/IEngineConfiguration";
import { Application, settings, SCALE_MODES, Graphics } from 'pixi.js';
import { ResourceManager } from "./resources/ResourceManager";
import { RoomMaterialManager } from "./objects/room/RoomMaterialManager";
import { EventManager } from "./objects/events/EventManager";
import { FurnitureManager } from "./objects/furniture/FurnitureManager";
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin";
import { DisplayObject } from "@pixi/display";
import { BlurFilter } from "@pixi/filter-blur";
import { ColorMatrixFilter } from "@pixi/filter-color-matrix";
import {AvatarManager} from "./objects/avatar/AvatarManager";
import {Log} from "./utils/Logger";

export class Scuti {

    private _canvas: HTMLElement;
    private _application: Application;

    private _resourceManager: ResourceManager;
    private _roomMaterialManager: RoomMaterialManager;
    private _eventManager: EventManager;
    private _furnitureManager: FurnitureManager;
    private _avatarManager: AvatarManager;

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

    public get avatars(): AvatarManager {
        return this._avatarManager;
    }

    public get events(): EventManager {
        return this._eventManager;
    }

    public async initialise(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            Log('', '⚡ Scuti Renderer - v1.0.0');
            const startDate: Date = new Date();
            gsap.registerPlugin(PixiPlugin);

            PixiPlugin.registerPIXI({
                DisplayObject: DisplayObject,
                Graphics: Graphics,
                filters: {
                    BlurFilter: BlurFilter,
                    ColorMatrixFilter: ColorMatrixFilter
                }
            });
            this._canvas = this._configuration.canvas;
            settings.SCALE_MODE = SCALE_MODES.NEAREST;

            this._application = new Application({
                width: this._configuration.width,
                height: this._configuration.height,
                backgroundColor: 0x24262A,
                antialias: false,
            });
            this._canvas.appendChild(this._application.view);

            this._resourceManager = new ResourceManager(this._configuration.resources);
            this._roomMaterialManager = new RoomMaterialManager(this);
            this._eventManager = new EventManager();
            this._furnitureManager = new FurnitureManager(this);
            this._avatarManager = new AvatarManager(this);
            await this._resourceManager.initialise();
            await this._roomMaterialManager.initialise();
            await this._eventManager.initialise();
            await this._furnitureManager.initialise();
            await this._avatarManager.initialise();
            resolve();
            const endDate: Date = new Date();
            Log('⚡', 'Scuti Renderer started in ' + (endDate.getTime() - startDate.getTime()) + 'ms.', 'success');
        });

    }


}