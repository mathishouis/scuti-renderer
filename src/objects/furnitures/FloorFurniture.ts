import { gsap } from 'gsap';

import type { IFloorFurnitureConfiguration, IFloorPosition } from '../../types/Furniture';
import { FurnitureData } from './visualizations/FurnitureData';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';
import { RoomObject } from '../rooms/objects/RoomObject';

/**
 * FloorFurniture class that aim to reproduce the floor furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class FloorFurniture extends RoomObject {
  /**
   * The furniture id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * @param {IFloorFurnitureConfiguration} [config] - The furniture configuration.
   */
  constructor(config: IFloorFurnitureConfiguration) {
    super(config);

    this._id = config.id;
    this._state = config.state ?? 0;
    this._data = new FurnitureData(this);
    this._visualization = new FurnitureVisualization(this);
  }

  /**
   * Reference to the furniture id from the furni data.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Move the furniture at the given position and in time.
   *
   * @param {IFloorPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  move(position: IFloorPosition, duration: number = 0.5): void {
    if (this._visualization === undefined) return;
    gsap.to(this.position, {
      x: position.x,
      y: position.y,
      z: position.z,
      duration,
      ease: 'linear',
      onUpdate: () => this._visualization.updatePosition()
    });
  }
}
