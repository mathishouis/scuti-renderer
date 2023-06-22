import { Container } from 'pixi.js';

import type { Scuti } from '../../Scuti';
import { RoomVisualization } from './RoomVisualization';
import { RoomTileMap } from './RoomTileMap';
import type { Material } from './materials/Material';
import { WallMaterial } from './materials/WallMaterial';
import { FloorMaterial } from './materials/FloorMaterial';
import { RoomCamera } from './RoomCamera';
import type { EventManager } from '../interactions/EventManager';
import type { IRoomConfig } from '../../types/Room';
import type { RoomPartLayer } from './layers/RoomPartLayer';
import type { RoomObjectLayer } from './layers/RoomObjectLayer';

/**
 * Room class for rendering rooms like the ones on Habbo Hotel.
 *
 * @class
 * @memberof Scuti
 */
export class Room extends Container {
  /**
   * The game engine instance that the room will be using to render objects.
   *
   * @member {Scuti}
   * @private
   */
  private readonly _engine: Scuti;

  /**
   * The room tile map where every informations about the room model is stored.
   *
   * @member {RoomTileMap}
   * @private
   */
  private _tileMap: RoomTileMap;

  /**
   * The wall material that will be applied in the room, it contains the color and the texture of the wall.
   *
   * @member {Material}
   * @private
   */
  private _wallMaterial: Material;

  /**
   * The floor material that will be applied in the room, it contains the color and the texture of the wall.
   *
   * @member {Material}
   * @private
   */
  private _floorMaterial: Material;

  /**
   * The wall thickness of the room.
   *
   * @member {number}
   * @private
   */
  private _wallThickness: number;

  /**
   * The floor thickness of the room.
   *
   * @member {number}
   * @private
   */
  private _floorThickness: number;

  /**
   * The wall height of the room, the height is added to the base height of the room.
   *
   * @member {number}
   * @private
   */
  private _wallHeight: number;

  /**
   * The room view instance, where all the objects like furnitures, avatars or the tiles, walls and stairs are stored.
   *
   * @member {RoomVisualization}
   * @private
   */
  private readonly _visualization: RoomVisualization;

  /**
   * The room camera, it manage the room dragging and centering the room when it's out of bounds.
   *
   * @member {RoomCamera}
   * @private
   */
  private readonly _camera: RoomCamera;

  /**
   * @param {Scuti} [engine] - The Scuti instance that will be used to render the room.
   * @param {IRoomConfig} [config] - The room configuration.
   * @param {string} [config.tilemap] - The room tile map that will be parsed.
   * @param {Material} [config.floorMaterial] - The room floor material that will be applied.
   * @param {number} [config.floorThickness] - The room floor thickness.
   * @param {Material} [config.wallMaterial] - The room wall material that will be applied.
   * @param {number} [config.wallHeight] - The room wall height.
   * @param {number} [config.wallThickness] - The room wall thickness.
   **/
  constructor(engine: Scuti, config: IRoomConfig) {
    super();

    /** Store variables */
    this._engine = engine;
    this._wallMaterial = config.wallMaterial ?? new WallMaterial(this._engine);
    this._floorMaterial = config.floorMaterial ?? new FloorMaterial(this._engine);
    this._wallThickness = config.wallThickness ?? 8;
    this._floorThickness = config.floorThickness ?? 8;
    this._wallHeight = config.wallHeight ?? 0;

    /** Initialise everything */
    this._tileMap = new RoomTileMap(config.tileMap);
    this._visualization = new RoomVisualization(this);
    this._camera = new RoomCamera(this);

    /** Add the room view and then the room camera to the PixiJS application */
    this.addChild(this._visualization);
    this._engine.application.stage.addChild(this._camera);
  }

  /**
   * Reference to the game engine instance.
   *
   * @member {Scuti}
   * @readonly
   * @public
   */
  public get engine(): Scuti {
    return this._engine;
  }

  /**
   * Reference to the room view instance.
   *
   * @member {RoomVisualization}
   * @readonly
   * @public
   */
  public get visualization(): RoomVisualization {
    return this._visualization;
  }

  /**
   * Reference to the room tile map instance.
   *
   * @member {RoomTileMap}
   * @readonly
   * @public
   */
  public get tileMap(): RoomTileMap {
    return this._tileMap;
  }

  /**
   * Update the room tileMap.
   *
   * @param {string} [tileMap] - The new room tileMap.
   * @public
   */
  public set tileMap(tileMap: RoomTileMap) {
    this._tileMap = tileMap;
    this._visualization.update();
  }

  /**
   * Reference to the wall material instance.
   *
   * @member {Material}
   * @readonly
   * @public
   */
  public get wallMaterial(): Material {
    return this._wallMaterial;
  }

  /**
   * Update the wall material and rerender the room.
   *
   * @param {Material} [material] - The room wall material that will be applied.
   * @public
   */
  public set wallMaterial(material: Material) {
    this._wallMaterial = material;
    this._visualization.update();
  }

  /**
   * Reference to the floor material instance.
   *
   * @member {Material}
   * @readonly
   * @public
   */
  public get floorMaterial(): Material {
    return this._floorMaterial;
  }

  /**
   * Update the floor material and rerender the room.
   *
   * @param {Material} [material] - The room floor material that will be applied.
   * @public
   */
  public set floorMaterial(material: Material) {
    this._floorMaterial = material;
    this._visualization.update();
  }

  /**
   * Reference to the wall thickness.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get wallThickness(): number {
    return this._wallThickness;
  }

  /**
   * Update the wall thickness and rerender the room.
   *
   * @param {number} [thickness] - The room wall thickness that will be applied.
   * @public
   */
  public set wallThickness(thickness: number) {
    this._wallThickness = thickness;
    this._visualization.update();
  }

  /**
   * Reference to the floor thickness.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get floorThickness(): number {
    return this._floorThickness;
  }

  /**
   * Update the floor thickness and rerender the room.
   *
   * @param {number} [thickness] - The room floor thickness that will be applied.
   * @public
   */
  public set floorThickness(thickness: number) {
    this._floorThickness = thickness;
    this._visualization.update();
  }

  /**
   * Reference to the wall height.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get wallHeight(): number {
    return this._wallHeight;
  }

  /**
   * Update the wall height and rerender the room.
   *
   * @param {number} [height] - The room wall height that will be applied.
   * @public
   */
  public set wallHeight(height: number) {
    this._wallHeight = height;
    this._visualization.update();
  }

  /**
   * Reference to the tile event manager.
   *
   * @member {EventManager}
   * @readonly
   * @public
   */
  public get tiles(): EventManager {
    return this._visualization.partLayer.tiles;
  }

  /**
   * Reference to the wall event manager.
   *
   * @member {EventManager}
   * @readonly
   * @public
   */
  public get walls(): EventManager {
    return this._visualization.partLayer.walls;
  }

  /**
   * Reference to the object layer container.
   *
   * @member {RoomObjectLayer}
   * @readonly
   * @public
   */
  public get objects(): RoomObjectLayer {
    return this._visualization.objectLayer;
  }

  /**
   * Reference to the part layer container.
   *
   * @member {RoomPartLayer}
   * @readonly
   * @public
   */
  public get parts(): RoomPartLayer {
    return this._visualization.partLayer;
  }

  /**
   * Reference to the room camera.
   *
   * @member {RoomCamera}
   * @readonly
   * @public
   */
  public get camera(): RoomCamera {
    return this._camera;
  }
}
