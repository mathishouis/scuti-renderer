import {Application} from "pixi.js";
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
        this._application = new Application({
            width: configuration.width,
            height: configuration.height
        });
        this._canvas = configuration.canvas;
        // @ts-ignore
        this._canvas.append(this._application.view);
    }

    /**
     * Return the PIXI.js application
     * @public
     */
    public get application(): Application {
        return this._application;
    }

    public get logger(): Logger {
        return this._logger;
    }


}
