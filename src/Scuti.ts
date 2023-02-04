import {Application, Assets, MIPMAP_MODES, SCALE_MODES, settings} from "pixi.js";
import {RendererConfiguration} from "./interfaces/Configuration.interface";
import {Logger} from "./utilities/Logger";

export class Scuti {

    /**
     * The canvas that the game engine will use.
     * @private
     */
    private _canvas: HTMLElement;

    /**
     * PIXI.js application.
     * @private
     */
    private _application: Application;

    /**
     * The renderer logger
     * @private
     */
    private _logger: Logger = new Logger("Scuti");

    /**
     * Game engine main class.
     * @param configuration - The game engine configuration.
     */
    constructor(
        private configuration: RendererConfiguration
    ) {
        this._logger.info("⚡ Scuti Renderer - v1.0.0");
        settings.RESOLUTION = 1;
        settings.SCALE_MODE = SCALE_MODES.NEAREST;
        this._application = new Application({
            width: configuration.width,
            height: configuration.height,
            resolution: 1,
            antialias: false,
        });
        this._canvas = configuration.canvas;
        // @ts-ignore
        this._canvas.append(this._application.view);
    }

    /**
     * Load all the needed ressources
     */
    public async loadResources(): Promise<void> {
        Assets.add('room/materials', 'http://127.0.0.1:8081/generic/room/room_data.json');
        Assets.add('room/room', 'http://127.0.0.1:8081/generic/room/room.json');
        await Assets.load('room/materials');
        await Assets.load('room/room');
    }

    /**
     * Return the PIXI.js application
     * @public
     */
    public get application(): Application {
        return this._application;
    }

    /**
     * Return the renderer logger
     */
    public get logger(): Logger {
        return this._logger;
    }


}
