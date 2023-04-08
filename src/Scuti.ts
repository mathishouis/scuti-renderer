import { Application, Assets, BaseTexture, Container, SCALE_MODES, settings } from "pixi.js";
import { IRendererConfiguration } from "./interfaces/Configuration.interface";
import { Logger } from "./utilities/Logger";
import { PixiPlugin } from "gsap/PixiPlugin";
import { gsap } from "gsap";
import { Stage } from "@pixi/layers";

/**
 * Convenience class to create a new Scuti renderer.
 *
 * This class automatically load all the needed resources and initialise the PixiJS application.
 * @example
 * import { Scuti } from 'scuti-renderer';
 *
 * // Create the renderer
 * const renderer = new Scuti({
 *     canvas: document.getElementById("app"),
 *     width: window.innerWidth,
 *     height: window.innerHeight,
 *     resources: './resources'
 * });
 * await renderer.loadResources();
 *
 * @class
 * @memberof Scuti
 */
export class Scuti {

    /**
     * The canvas that will be used to render the PixiJS canvas.
     *
     * @member {HTMLElement}
     * @private
     */
    private _canvas: HTMLElement;

    /**
     * The PixiJS application instance that will be used to render everything.
     *
     * @member {Application}
     * @private
     */
    private _application: Application;

    /**
     * The renderer logger instance.
     *
     * @member {Logger}
     * @private
     */
    private _logger: Logger = new Logger("Scuti");

    /**
     * @param {IRendererConfiguration} [configuration] - The renderer configuration.
     * @param {HTMLElement} [configuration.canvas] - The canvas that will be used to render everything.
     * @param {number} [configuration.width] - The width of the render part.
     * @param {number} [configuration.height] - The height of the render part.
     * @param {string} [configuration.resources] - The URL of the resource server.
     **/
    constructor(
        private configuration: IRendererConfiguration
    ) {
        this._logger.info("⚡ Scuti Renderer - v1.0.0");
        /** Change the PixiJS settings and default settings */
        settings.RESOLUTION = 1;
        Container.defaultSortableChildren = true;
        BaseTexture.defaultOptions.scaleMode = SCALE_MODES.NEAREST;
        /** Register the plugins */
        gsap.registerPlugin(PixiPlugin);
        /** Create the PixiJS application */
        this._application = new Application({
            width: configuration.width,
            height: configuration.height,
            resolution: 1,
            antialias: false,
        });
        this._application.stage = new Stage();
        this._canvas = configuration.canvas;
        /** Append it to the canvas */
        this._canvas.append(this._application.view);
    }

    /**
     * It loads all the resources that are essentials for rendering rooms and objects.
     * It's necessary to call this method just after the instanciation of this class.
     *
     * @member {Promise<void>}
     * @public
     */
    public async loadResources(domain: String = 'http://127.0.0.1:8081'): Promise<void> {
        /** Add all the resources */
        Assets.add("room/materials", domain + "/generic/room/room_data.json");
        Assets.add("room/room", domain + "/generic/room/room.json");
        Assets.add("room/cursors", domain + "/generic/tile_cursor/tile_cursor.json");
        Assets.add("furnitures/floor/placeholder", domain + "/generic/place_holder/place_holder_furniture.json");
        Assets.add("furnitures/furnidata", domain + "/gamedata/furnidata.json");
        Assets.add("figures/figuredata", domain + "/gamedata/figuredata.json");
        Assets.add("figures/figuremap", domain + "/gamedata/figuremap.json");
        Assets.add("figures/draworder", domain + "/gamedata/draworder.json");
        Assets.add("figures/actions", domain + "/generic/HabboAvatarActions.json");
        Assets.add("figures/partsets", domain + "/generic/HabboAvatarPartSets.json");
        Assets.add("figures/animations", domain + "/generic/HabboAvatarAnimations.json");
        /** And now load them */
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
     * Reference to the PixiJS application instance.
     *
     * @member {Application}
     * @readonly
     * @public
     */
    public get application(): Application {
        return this._application;
    }

    /**
     * Reference to the renderer logger instance.
     *
     * @member {Logger}
     * @readonly
     * @public
     */
    public get logger(): Logger {
        return this._logger;
    }


}
