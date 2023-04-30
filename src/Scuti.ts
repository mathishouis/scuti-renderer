import { Application, BaseTexture, Container, SCALE_MODES, settings } from 'pixi.js';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { gsap } from 'gsap';
import { Stage } from '@pixi/layers';

import { Logger } from './utilities/Logger';
import type { IRendererConfiguration } from './interfaces/Configuration';
import { AssetLoader } from './utilities/AssetLoader';

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
  private readonly _canvas: HTMLElement;

  /**
   * The PixiJS application instance that will be used to render everything.
   *
   * @member {Application}
   * @private
   */
  private readonly _application: Application;

  /**
   * The renderer logger instance.
   *
   * @member {Logger}
   * @private
   */
  private readonly _logger: Logger = new Logger('Scuti');

  /**
   * @param {IRendererConfiguration} [configuration] - The renderer configuration.
   * @param {HTMLElement} [configuration.canvas] - The canvas that will be used to render everything.
   * @param {number} [configuration.width] - The width of the render part.
   * @param {number} [configuration.height] - The height of the render part.
   * @param {string} [configuration.resources] - The URL of the resource server.
   **/
  constructor(configuration: IRendererConfiguration) {
    this._logger.info('⚡ Scuti Renderer - v1.0.0');

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
      antialias: false
    });
    (globalThis as any).__PIXI_APP__ = this._application; // Support for PIXI.js dev-tool.
    this._application.stage = new Stage();
    this._canvas = configuration.canvas;

    /** Append it to the canvas */
    // @ts-expect-error
    this._canvas.append(this._application.view);
  }

  /**
   * It loads all the resources that are essentials for rendering rooms and objects.
   * It's necessary to call this method just after the instanciation of this class.
   *
   * @member {Promise<void>}
   * @public
   */
  public async loadResources(domain: string = 'http://127.0.0.1:8081/'): Promise<void> {
    AssetLoader.domain = domain;

    /** And now load them */
    await Promise.all([
      AssetLoader.load('room/materials', 'generic/room/room_data.json'),
      AssetLoader.load('room/room', 'generic/room/room.json'),
      AssetLoader.load('room/cursors', 'generic/tile_cursor/tile_cursor.json'),
      AssetLoader.load('furnitures/floor/placeholder', 'generic/place_holder/place_holder_furniture.json'),
      AssetLoader.load('furnitures/furnidata', 'gamedata/furnidata.json'),
      AssetLoader.load('figures/figuredata', 'gamedata/figuredata.json'),
      AssetLoader.load('figures/figuremap', 'gamedata/figuremap.json'),
      AssetLoader.load('figures/draworder', 'gamedata/draworder.json'),
      AssetLoader.load('figures/actions', 'generic/HabboAvatarActions.json'),
      AssetLoader.load('figures/partsets', 'generic/HabboAvatarPartSets.json'),
      AssetLoader.load('figures/animations', 'generic/HabboAvatarAnimations.json')
    ]);
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
