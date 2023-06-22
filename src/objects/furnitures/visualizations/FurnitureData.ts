import { Assets } from 'pixi.js';

import type { ISharedFurniData } from '../../../types/Furniture';
import { FloorFurniture } from '../FloorFurniture';
import type { WallFurniture } from '../WallFurniture';

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
   * @member {ISharedFurniData}
   * @private
   */
  private _data!: ISharedFurniData;

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
    const furniType = this._furniture instanceof FloorFurniture ? 'floorItems' : 'wallItems';
    this._data = Assets.get('furnitures/furnidata')[furniType].find((item: ISharedFurniData) => {
      return item.id === this._furniture.id;
    });
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
  public get color(): number | null {
    if (!Boolean(this._data.className.includes('*'))) return null;
    return Number(this._data.className.split('*')[1]);
  }
}
