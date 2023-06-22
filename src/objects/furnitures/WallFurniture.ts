import { gsap } from 'gsap';

import type { IWallFurniConfig, IWallPosition } from '../../types/Furniture';
import { RoomObject } from '../rooms/objects/RoomObject';
import { FurnitureData } from './visualizations/FurnitureData';
import { FurnitureVisualization } from './visualizations/FurnitureVisualization';

/**
 * WallFurniture class that aim to reproduce the wall furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class WallFurniture extends RoomObject {
  /**
   * The furniture's id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * @param {IWallFurniConfig} [config] - The furniture configuration.
   */
  constructor(config: IWallFurniConfig) {
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
   * @param {IWallPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  move(position: IWallPosition, duration: number = 0.5): void {
    if (this._visualization === undefined) return;
    gsap.to(this.position, {
      x: position.x,
      y: position.y,
      duration,
      ease: 'linear',
      onUpdate: () => this._visualization.updatePosition()
    });
  }
}
