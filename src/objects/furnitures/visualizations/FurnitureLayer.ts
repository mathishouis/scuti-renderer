import type { BLEND_MODES } from 'pixi.js';
import { Assets } from 'pixi.js';
import { Color } from '@pixi/color';

import type { FloorFurniture } from '../FloorFurniture';
import type { IFurnitureLayerConfiguration } from '../../../types/Furniture';
import { HitSprite } from '../../interactions/HitSprite';
import type { WallFurniture } from '../WallFurniture';
import type { Direction } from '../../../enums/Direction';
import { WiredSelectionFilter } from '../../filters/WiredSelectionFilter';

/** The wired selection filter */
const WIRED_SELECTION_FILTER = new WiredSelectionFilter(0xffffff, 0x999999);

/**
 * FurnitureLayer class.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureLayer extends HitSprite {
  /**
   * The furniture instance.
   *
   * @member {FloorFurniture | WallFurniture}
   * @private
   */
  private readonly _furniture: FloorFurniture | WallFurniture;

  /**
   * The layer id.
   *
   * @member {number | string}
   * @private
   */
  private readonly _layer: number;

  /**
   * The layer alpha.
   *
   * @member {number}
   * @private
   */
  private readonly _alpha: number;

  /**
   * The layer tint.
   *
   * @member {number}
   * @private
   */
  private readonly _tint: number;

  /**
   * The layer z index.
   *
   * @member {number}
   * @private
   */
  private readonly _z: number;

  /**
   * The layer blend mode.
   *
   * @member {BLEND_MODES}
   * @private
   */
  private readonly _blendMode: BLEND_MODES;

  /**
   * Is the layer flipped.
   *
   * @member {boolean}
   * @private
   */
  private readonly _flip: boolean;

  /**
   * The layer frame id.
   *
   * @member {number}
   * @private
   */
  private readonly _frame: number;

  /**
   * Is the layer interactive.
   *
   * @member {boolean}
   * @private
   */
  private readonly _ignoreMouse: boolean;

  /**
   * The layer direction.
   *
   * @member {Direction}
   * @private
   */
  private readonly _direction: Direction;

  /**
   * The layer tag.
   *
   * @member {string}
   * @private
   */
  private readonly _tag: string;

  /**
   * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
   * @param {IFurnitureLayerConfiguration} [config] - The layer configuration.
   */
  constructor(furniture: FloorFurniture | WallFurniture, config: IFurnitureLayerConfiguration) {
    super(undefined);

    this._furniture = furniture;
    this._layer = config.layer;
    this._alpha = config.alpha;
    this._tint = config.tint;
    this._z = config.z;
    this._blendMode = config.blendMode;
    this._flip = config.flip;
    this._frame = config.frame;
    this._ignoreMouse = config.ignoreMouse;
    this._direction = config.direction;
    this._tag = config.tag;

    this._draw();
  }

  /**
   * Draw the part.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    this.filters = [];
    this.texture = Assets.get('furnitures/' + this._furniture.data.baseName).textures[
      this._furniture.data.baseName +
        '_' +
        this._furniture.data.baseName +
        '_64_' +
        String.fromCharCode(97 + Number(this._layer)) +
        '_' +
        String(this._direction) +
        '_' +
        String(this._frame)
    ];
    /*console.log(
    this._furniture.data.baseName +
    '_' +
    this._furniture.data.baseName +
    '_64_' +
    String.fromCharCode(97 + Number(this._layer)) +
    '_' +
    String(this._direction) +
    '_' +
    String(this._frame)
      );*/
    if (this._tint !== undefined) this.tint = new Color(this._tint).premultiply(1).toNumber();
    if (this._blendMode !== undefined) this.blendMode = this._blendMode;
    if (this._alpha !== undefined) this.alpha = this._alpha;
    if (this._flip) this.scale.x = -1;
    //if (this._furniture.room !== undefined) this.parentLayer = this._furniture.room.objects.layer;
    if (this._z !== undefined) this.zIndex = this._z;
    if (this._ignoreMouse !== null && !this._ignoreMouse) this.interactive = true;
    if (this._furniture.selected) this.filters.push(WIRED_SELECTION_FILTER);

    this.on('pointerdown', (event) => {
      return this._furniture.eventManager.handlePointerDown({ event, tag: this._tag });
    });
    this.on('pointerup', (event) => {
      return this._furniture.eventManager.handlePointerUp({ event, tag: this._tag });
    });
    this.on('pointermove', (event) => {
      return this._furniture.eventManager.handlePointerMove({ event, tag: this._tag });
    });
    this.on('pointerout', (event) => {
      return this._furniture.eventManager.handlePointerOut({ event, tag: this._tag });
    });
    this.on('pointerover', (event) => {
      return this._furniture.eventManager.handlePointerOver({ event, tag: this._tag });
    });
  }

  /**
   * Reference to the furniture instance.
   *
   * @member {FloorFurniture | WallFurniture}
   * @readonly
   * @public
   */
  public get furniture(): FloorFurniture | WallFurniture {
    return this._furniture;
  }

  public get layer(): number {
    return this._layer;
  }
}
