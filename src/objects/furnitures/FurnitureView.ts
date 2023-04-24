import type { Spritesheet } from 'pixi.js';
import { Assets, Container, Sprite } from 'pixi.js';

import { FurniturePart } from './FurniturePart';
import type { FloorFurniture } from './FloorFurniture';
import type { WallFurniture } from './WallFurniture';
import { FurnitureLayer } from './FurnitureLayer';
import { FurnitureGuildCustomizedVisualization } from './visualizations/FurnitureGuildCustomizedVisualization';
import type { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { AssetLoader } from '../../utilities/AssetLoader';
import { FurnitureRoomBackgroundVisualization } from './visualizations/FurnitureRoomBackgroundVisualization';
import type { IFurnitureProperty } from '../../interfaces/Furniture';

/**
 * FurnitureView class that manage all the rendering part of the furniture.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureView extends Container {
  /**
   * The furniture instance that we want to render.
   *
   * @member {FloorFurniture | WallFurniture}
   * @private
   */
  private readonly _furniture: FloorFurniture | WallFurniture;

  /**
   * A list containing all the furnitures parts.
   *
   * @member {FurniturePart[]}
   * @private
   */
  private _parts: FurniturePart[] = [];

  /**
   * The spritesheet of the furniture.
   *
   * @member {Spritesheet}
   * @private
   */
  private _spritesheet!: Spritesheet;

  /**
   * The furniture property.
   *
   * @member {IFurnitureProperty}
   * @private
   */
  private _property!: IFurnitureProperty;

  /**
   * The furniture visualization.
   *
   * @member {FurnitureVisualization}
   * @private
   */
  private _visualization!: FurnitureVisualization;

  /**
   * The load event.
   *
   * @member {() => void}
   * @private
   */
  private _onLoad!: () => void;

  /**
   * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance to render.
   */
  constructor(furniture: FloorFurniture | WallFurniture) {
    super();
    /** Store data */
    this._furniture = furniture;
    /** Load the spritesheet */
    AssetLoader.load(
      'furnitures/' + this._furniture.data.baseName,
      'furniture/' + this._furniture.data.baseName + '/' + this._furniture.data.baseName + '.json',
      () => {
        this._createPlaceholder();
      }
    )
      .then(() => {
        this._spritesheet = Assets.get('furnitures/' + this._furniture.data.baseName);
        // @ts-expect-error
        this._property = this._spritesheet.data.furniProperty;
        this._initialiseVisualization();
        if (this._onLoad != null) this._onLoad();
        this._draw();
      })
      .catch((error) => {
        return console.error(error);
      });
  }

  /**
   * Initialise furniture visualization.
   *
   * @return {void}
   * @private
   */
  private _initialiseVisualization(): void {
    // @ts-expect-error
    if (this._property.infos.visualization === 'furniture_guild_customized')
      this._visualization = new FurnitureGuildCustomizedVisualization(this._furniture);
    // @ts-expect-error
    if (this._property.infos.visualization === 'furniture_bg')
      this._visualization = new FurnitureRoomBackgroundVisualization(this._furniture);
  }

  /**
   * Draw the furniture visualization with all the parts.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    this._destroyParts();
    this._createShadow();
    for (let i: number = 0; i < this._property.visualization.layerCount; i++) {
      this._createPart(i);
    }
  }

  /**
   * Destroy all the furniture parts.
   *
   * @return {void}
   * @private
   */
  private _destroyParts(): void {
    [...this._parts].forEach((part: FurniturePart) => {
      return part.destroy();
    });
    this._parts = [];
    this.removeChild(this.children[0]);
  }

  /**
   * Rerender all the room visualization.
   *
   * @return {void}
   * @private
   */
  public update(): void {
    this._draw();
  }

  /**
   * The method is called when the room animation ticker tick.
   *
   * @return {void}
   * @private
   */
  public tick(): void {
    this._parts.forEach((part: FurniturePart) => {
      return part.nextFrame();
    });
  }

  /**
   * Create a furniture part by it's layer id.
   *
   * @param {number} [layer] - The layer id that we want to render.
   * @return {void}
   * @private
   */
  private _createPart(layer: number): void {
    const part: FurniturePart = new FurniturePart(this._furniture, layer);
    this._parts.push(part);
    this.addChild(part);
  }

  /**
   * Create the furniture placeholder while the spritesheet is loading.
   *
   * @return {void}
   * @private
   */
  private _createPlaceholder(): void {
    const placeholder: Sprite = new Sprite(
      Assets.get('furnitures/floor/placeholder').textures['place_holder_furniture_64.png']
    );
    this.addChild(placeholder);
    placeholder.x = -32;
    placeholder.y = -50;
  }

  /**
   * Create the furniture shadow.
   *
   * @return {void}
   * @private
   */
  private _createShadow(): void {
    this.addChild(
      // @ts-expect-error
      new FurnitureLayer(this._furniture, {
        layer: 'sd',
        alpha: 0.1,
        // @ts-expect-error
        tint: undefined,
        z: 0,
        // @ts-expect-error
        blendMode: undefined,
        flip: false,
        frame: 0,
        ignoreMouse: true,
        direction: 0
      })
    );
  }

  /**
   * Reference to the furniture spritesheet.
   *
   * @member {Spritesheet}
   * @readonly
   * @public
   */
  public get spritesheet(): Spritesheet {
    return this._spritesheet;
  }

  /**
   * Reference to the furniture properties.
   *
   * @member {IFurnitureProperty}
   * @readonly
   * @public
   */
  public get property(): IFurnitureProperty {
    return this._property;
  }

  /**
   * Reference to the furniture visualization.
   *
   * @member {FurnitureVisualization}
   * @readonly
   * @public
   */
  public get visualization(): FurnitureVisualization {
    return this._visualization;
  }

  /**
   * Reference to the load event.
   *
   * @member {() => void}
   * @readonly
   * @public
   */
  public get onLoad(): () => void {
    return this._onLoad;
  }

  /**
   * Update the event function that will be executed.
   *
   * @param {() => void} [value] - The event function that will be executed.
   * @public
   */
  public set onLoad(value: () => void) {
    this._onLoad = value;
  }
}
