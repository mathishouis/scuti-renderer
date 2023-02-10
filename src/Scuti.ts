import {Application, Assets, BaseTexture, Container, MIPMAP_MODES, SCALE_MODES, settings} from "pixi.js";
import {IRendererConfiguration} from "./interfaces/Configuration.interface";
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
        private configuration: IRendererConfiguration
    ) {
        this._logger.info("⚡ Scuti Renderer - v1.0.0");
        settings.RESOLUTION = 1;
        Container.defaultSortableChildren = true;
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
        Assets.add("figures/figuredata", "http://127.0.0.1:8081/gamedata/figuredata.json");
        Assets.add("figures/figuremap", "http://127.0.0.1:8081/gamedata/figuremap.json");
        Assets.add("figures/draworder", "http://127.0.0.1:8081/gamedata/draworder.json");
        Assets.add("figures/actions", "http://127.0.0.1:8081/generic/HabboAvatarActions.json");
        Assets.add("figures/partsets", "http://127.0.0.1:8081/generic/HabboAvatarPartSets.json");
        Assets.add("figures/animations", "http://127.0.0.1:8081/generic/HabboAvatarAnimations.json");
        await Assets.load("room/materials");
        await Assets.load("room/room");
        await Assets.load("room/cursors");
        await Assets.load("furnitures/floor/placeholder");
        await Assets.load("furnitures/furnidata");
        await Assets.load("figures/figuredata");
        await Assets.load("figures/figuremap");
        await Assets.load("figures/draworder");
        await Assets.load("figures/actions");
        await Assets.load("figures/partsets");
        await Assets.load("figures/animations");
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
