import { Graphics, Matrix, Point, Polygon } from 'pixi.js';
import { Color } from '@pixi/color';

import type { Room } from '../Room';
import type { ITileConfiguration, ITileInfo } from '../../../types/Room';
import type { Material } from '../materials/Material';
import { FloorMaterial } from '../materials/FloorMaterial';
import { ZOrder } from '../../../utilities/ZOrder';
import { RoomPart } from './RoomPart';
import type { Dimension } from '../../../types/Dimension';

/**
 * Tile class that show up during room rendering.
 *
 * @class
 * @memberof Scuti
 */
export class Tile extends RoomPart {
  /**
   * The ITileInfo instance
   *
   * @member {ITileInfo}
   * @private
   */
  private readonly _tileInfo?: ITileInfo;

  /**
   * The thickness of the tile part.
   *
   * @member {number}
   * @private
   */
  private _thickness: number;

  /**
   * The tile material that will be applied to this part, it contains the color and the texture of the tile.
   *
   * @member {Material}
   * @private
   */
  private _material: Material;

  /**
   * The tile position.
   *
   * @member {IPosition3D}
   * @private
   */
  readonly _position: Dimension.IPosition3D;

  /**
   * @param {Room} [room] - The room instance where the tile will be drawn.
   * @param {ITileConfiguration} [configuration] - The tile configuration.
   * @param {Material} [configuration.material] - The time material that will be applied.
   * @param {number} [configuration.thickness] - The tile thickness.
   * @param {IPosition3D} [configuration.position] - The tile position.
   **/
  constructor(room: Room, configuration: ITileConfiguration, tileInfo?: ITileInfo) {
    super(room);

    /** Store the configuration */
    this.room = room;
    this._tileInfo = tileInfo;
    this._position = configuration.position;
    this._thickness = configuration.thickness ?? 8;
    this._material = configuration.material ?? new FloorMaterial(this.room.engine, 111);

    /** Register interactions */
    this.registerInteractions(this._position);

    // TODO: Make the method public and use it when adding it to a room, not when instancing the class
    /** Draw the tile */
    this._draw();
  }

  /**
   * Draw the tile.
   *
   * @return {void}
   * @private
   */
  private _draw(): void {
    /** Top face */
    const top = new Graphics()
      .beginTextureFill({
        texture: this._material.texture,
        color: new Color(this._material.color).premultiply(1).toNumber(),
        //matrix: new Matrix(1, 0.5, 1, -0.5, (this._position.x % 2 === 0 || this._position.y % 2 === 0) && !(this._position.x % 2 === 0 && this._position.y % 2 === 0) ? 32 : 0, (this._position.x % 2 === 0 || this._position.y % 2 === 0) && !(this._position.x % 2 === 0 && this._position.y % 2 === 0) ? 16 : 0)
        matrix: new Matrix(1, 0.5, 1, -0.5, this._position.y % 2 === 0 ? 32 : 64, this._position.y % 2 === 0 ? 16 : 0)
      })
      .moveTo(0, 0)
      .lineTo(32, -16)
      .lineTo(64, 0)
      .lineTo(32, 16)
      .lineTo(0, 0)
      .endFill();

    this.addChild(top);

    let bottomTile;
    let rightTile;

    if (
      this.room.tileMap.tileMap[this._position.y + 1] !== undefined &&
      this.room.tileMap.tileMap[this._position.y + 1][this._position.x] !== undefined
    ) {
      bottomTile = this.room.tileMap.getTileInfo({ x: this._position.x, y: this._position.y + 1 });
    }

    if (this.room.tileMap.tileMap[this._position.y][this._position.x + 1] !== undefined) {
      rightTile = this.room.tileMap.getTileInfo({ x: this._position.x + 1, y: this._position.y });
    }

    if (
      !Boolean(bottomTile) ||
      Boolean(bottomTile?.stairType) ||
      !Boolean(bottomTile?.tile) ||
      (this._tileInfo != null && bottomTile?.height !== this._tileInfo.height)
    ) {
      /** Left face */
      const left = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.8).toNumber(),
          matrix: new Matrix(1, 0.5, 0, 1, 0, 0)
        })
        .moveTo(0, 0)
        .lineTo(0, this._thickness)
        .lineTo(32, 16 + this._thickness)
        .lineTo(32, 16)
        .endFill();

      this.addChild(left);
    }

    if (
      rightTile == null ||
      rightTile.stairType != null ||
      !rightTile.tile ||
      (this._tileInfo != null && rightTile.height !== this._tileInfo.height)
    ) {
      /** Right face */
      const right = new Graphics()
        .beginTextureFill({
          texture: this._material.texture,
          color: new Color(this._material.color).premultiply(0.71).toNumber(),
          matrix: new Matrix(1, -0.5, 0, 1, 0, 0)
        })
        .moveTo(32, 16)
        .lineTo(32, 16 + this._thickness)
        .lineTo(64, this._thickness)
        .lineTo(64, 0)
        .lineTo(32, 16)
        .endFill();

      this.addChild(right);
    }

    /** Positionate the wall */
    this.x = 32 * this._position.x - 32 * this._position.y;
    this.y = 16 * this._position.x + 16 * this._position.y - 32 * this._position.z;
    /** Set the hit area */
    this.hitArea = new Polygon(
      new Point(0, 0),
      new Point(32, -16),
      new Point(64, 0),
      new Point(32, 16),
      new Point(0, 0)
    );
    /** Set the zIndex */
    this.zIndex = ZOrder.floor(this._position);
  }

  /**
   * Reference to the tile thickness.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get thickness(): number {
    return this._thickness;
  }

  /**
   * Update the tile thickness and redraw the tile.
   *
   * @param {number} [thickness] - The room tile thickness that will be applied.
   * @public
   */
  public set thickness(thickness: number) {
    this._thickness = thickness;
    /** Redraw the tile */
    this._draw();
  }

  /**
   * Reference to the tile material instance.
   *
   * @member {Material}
   * @readonly
   * @public
   */
  public get material(): Material {
    return this._material;
  }

  /**
   * Update the tile material and redraw the tile.
   *
   * @param {Material} [material] - The room tile material that will be applied.
   * @public
   */
  public set material(material: Material) {
    this._material = material;
    /** Redraw the tile */
    this._draw();
  }
}
