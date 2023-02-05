import {Application, Assets, BaseTexture, MIPMAP_MODES, SCALE_MODES, settings} from "pixi.js";
import {RendererConfiguration} from "./interfaces/Configuration.interface";
import {Logger} from "./utilities/Logger";
import {PixiPlugin} from "gsap/PixiPlugin";
import {gsap} from "gsap";

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
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
        gsap.registerPlugin(PixiPlugin);
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
        Assets.add("room/materials", "http://127.0.0.1:8081/generic/room/room_data.json");
        Assets.add("room/room", "http://127.0.0.1:8081/generic/room/room.json");
        Assets.add("room/cursors", "http://127.0.0.1:8081/generic/tile_cursor/tile_cursor.json");
        Assets.add("furnitures/floor/placeholder", "http://127.0.0.1:8081/generic/place_holder/place_holder_furniture.json");
        Assets.add("furnitures/furnidata", "http://127.0.0.1:8081/gamedata/furnidata.json");
        await Assets.load("room/materials");
        await Assets.load("room/room");
        await Assets.load("room/cursors");
        await Assets.load("furnitures/floor/placeholder");
        await Assets.load("furnitures/furnidata");
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
