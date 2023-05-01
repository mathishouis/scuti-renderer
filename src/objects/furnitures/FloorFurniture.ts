import { gsap } from 'gsap';

import type { IFloorFurnitureConfiguration, IFloorPosition, IWallPosition } from '../../interfaces/Furniture';
import { FurnitureData } from './FurnitureData';
import { FurnitureAnimatedVisualization } from './visualizations/FurnitureAnimatedVisualization';
import { RoomObject } from '../rooms/objects/RoomObject';

/**
 * FloorFurniture class that aim to reproduce the floor furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class FloorFurniture extends RoomObject {
  /**
   * The furniture position in the room.
   *
   * @member {IFloorPosition}
   * @private
   */
  public _position: IFloorPosition;

  /**
   * The furniture id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * @param {IFloorFurnitureConfiguration} [configuration] - The furniture configuration.
   */
  constructor(configuration: IFloorFurnitureConfiguration) {
    super();
    /** Store the data */
    this._id = configuration.id;
    this._position = configuration.position;
    this._direction = configuration.direction;
    this._state = configuration.state ?? 0;
    this._data = new FurnitureData(this);
    this._visualization = new FurnitureAnimatedVisualization(this);
  }

  /**
   * Reference to the furniture position in the room.
   *
   * @member {IFloorPosition}
   * @readonly
   * @public
   */
  public get position(): IFloorPosition {
    return this._position;
  }

  /**
   * Move the furniture at the given position and in time.
   *
   * @param {IFloorPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  move(position: IFloorPosition | IWallPosition, duration: number = 0.5): void {
    if (this._visualization === undefined) return;
    gsap.to(this._position, {
      x: position.x,
      y: position.y,
      duration,
      ease: 'linear',
      onUpdate: () => {
        this._visualization.updatePosition();
      }
    });
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
}
