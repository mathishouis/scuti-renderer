import type { FloorFurniture } from '../FloorFurniture';
import type { WallFurniture } from '../WallFurniture';

/**
 * FurnitureVisualization class for the furniture visualization.
 *
 * @class
 * @memberof Scuti
 */
export class FurnitureVisualization {
  /**
   * The furniture instance that is the parent of the part.
   *
   * @member {FloorFurniture | WallFurniture}
   * @private
   */
  private readonly _furniture: FloorFurniture | WallFurniture;

  /**
   * @param {FloorFurniture | WallFurniture} [furniture] - The furniture instance.
   */
  constructor(furniture: FloorFurniture | WallFurniture) {
    this._furniture = furniture;
  }

  /**
   * Reference to the furniture.
   *
   * @member {FloorFurniture | WallFurniture}
   * @readonly
   * @public
   */
  public get furniture(): FloorFurniture | WallFurniture {
    return this._furniture;
  }
}
