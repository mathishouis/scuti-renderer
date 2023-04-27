// @ts-nocheck
import { Assets } from 'pixi.js';

import { FloorFurniture } from './FloorFurniture';
import { WallFurniture } from './WallFurniture';
import type { IFurnitureData } from '../../interfaces/Furniture.interface';

/**
 * FurnitureData class that manage the data of a furniture.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureData {
  /**
   * The furniture instance that we want to retrieve data.
   *
   * @member {FloorFurniture | WallFurniture}
   * @private
   */
  private readonly _furniture: FloorFurniture | WallFurniture;

  /**
   * The furniture data.
   *
   * @member {IFurnitureData}
   * @private
   */
  private _data!: IFurnitureData;

  /**
   * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
   */
  constructor(furniture: FloorFurniture | WallFurniture) {
    this._furniture = furniture;

    this._load();
  }

  /**
   * Load the furniture data.
   *
   * @return {void}
   * @private
   */
  private _load(): void {
    if (this._furniture instanceof FloorFurniture) {
      // @ts-expect-error
      this._data = Assets.get('furnitures/furnidata').floorItems.find((item) => {
        return item.id === this._furniture.id;
      });
    } else if (this._furniture instanceof WallFurniture) {
      // @ts-expect-error
      this._data = Assets.get('furnitures/furnidata').wallItems.find((item) => {
        return item.id === this._furniture.id;
      });
    }
  }

  /**
   * Reference to the furniture id.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get id(): number {
    return this._data.id;
  }

  /**
   * Reference to the furniture class name.
   *
   * @member {string}
   * @readonly
   * @public
   */
  public get className(): string {
    return this._data.className;
  }

  /**
   * Reference to the furniture base name.
   *
   * @member {string}
   * @readonly
   * @public
   */
  public get baseName(): string {
    if (!Boolean(this._data.className.includes('*'))) return this._data.className;
    return this._data.className.split('*')[0];
  }

  /**
   * Reference to the furniture color id.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get color(): number {
    // @ts-expect-error
    if (!Boolean(this._data.className.includes('*'))) return null;
    return Number(this._data.className.split('*')[1]);
  }
}
