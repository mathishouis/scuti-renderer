import type { IWallFurnitureConfiguration, IWallPosition } from '../../interfaces/Furniture';
import { FurnitureData } from './FurnitureData';
import { RoomObject } from '../rooms/objects/RoomObject';
import {FurnitureAnimatedVisualization} from "./visualizations/FurnitureAnimatedVisualization";
import {gsap} from "gsap";

/**
 * WallFurniture class that aim to reproduce the wall furnitures on Habbo.
 *
 * @class
 * @memberof Scuti
 */
export class WallFurniture extends RoomObject {
  /**
   * The furniture id that represent the one in furnidata.
   *
   * @member {number}
   * @private
   */
  private readonly _id: number;

  /**
   * The furniture position in the room.
   *
   * @member {IWallPosition}
   * @private
   */
  public _position: IWallPosition;

  /**
   * @param {IWallFurnitureConfiguration} [configuration] - The furniture configuration.
   */
  constructor(configuration: IWallFurnitureConfiguration) {
    super();
    /** Store the data */
    this._id = configuration.id;
    this._position = configuration.position;
    this._direction = configuration.direction;
    this._state = configuration.state ?? 0;
    this._data = new FurnitureData(this);
    console.log(this._data);
    this._visualization = new FurnitureAnimatedVisualization(this);
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
   * Reference to the furniture position in the room.
   *
   * @member {IWallPosition}
   * @readonly
   * @public
   */
  public get position(): IWallPosition {
    return this._position;
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
}
