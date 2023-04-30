import { gsap } from 'gsap';

import type {IFloorFurnitureConfiguration, IFloorPosition, IWallPosition} from '../../interfaces/Furniture';
import type { Direction } from '../../enums/Direction';
import { FurnitureData } from './FurnitureData';
import { EventManager } from '../interactions/EventManager';
import type { IInteractionEvent } from '../../interfaces/Interaction';
import { FurnitureView } from './FurnitureView';
import type { FurnitureVisualization } from './FurnitureVisualization';
import {AssetLoader} from "../../utilities/AssetLoader";
import {FurnitureAnimatedVisualization} from "./visualizations/FurnitureAnimatedVisualization";
import {RoomObject} from "../rooms/objects/RoomObject";

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
   * The furniture position in the room.
   *
   * @member {IFloorPosition}
   * @private
   */


  /**
   * The furniture direction (0, 2, 4, 6).
   *
   * @member {Direction}
   * @private
   */


  /**
   * The furniture state that represent it's current playing animation.
   *
   * @member {number}
   * @private
   */
  private _state: number;

  /**
   * A boolean indicating if we have to apply the wired selection filter to the furniture.
   *
   * @member {boolean}
   * @private
   */
  private _selected: boolean = false;

  /**
   * The furniture data.
   *
   * @member {FurnitureData}
   * @private
   */
  private readonly _data: FurnitureData;

  //private _visualization!: FurnitureVisualization;

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
    /** Initialise view */
    //this._view = new FurnitureView(this);
    //this.addChild(this._view);
    /** Set the furniture position in the canvas */
    //this._updatePosition();
  }



  /**
   * Update the furniture position in the canvas.
   *
   * @return {void}
   * @private
   */


  /**
   * Add the furniture to the ticker to start the animation.
   *
   * @return {void}
   * @public
   */

  /**
   * Remove the furniture from the ticker to stop the animation.
   *
   * @return {void}
   * @public
   */

  /**
   * Move the furniture at the given position and in time.
   *
   * @param {IFloorPosition} [position] - The position where we want to move the furniture.
   * @param {number} [duration] - The time to move the furniture to the given position.
   * @return {void}
   * @public
   */
  /*public move = (position: IFloorPosition, duration: number = 0.5): void => {
    gsap.to(this, {
      x: 32 + 32 * position.x - 32 * position.y,
      y: 16 * position.x + 16 * position.y - 32 * position.z,
      duration,
      ease: 'linear',
      onComplete: () => {
        this._position = position;
      }
    });
  };*/

  /**
   * Rotate the furniture at the given direction and in time.
   *
   * @param {Direction} [direction] - The new direction of the furniture.
   * @param {number} [duration] - The time to rotate the furniture at the given direction.
   * @return {void}
   * @public
   */


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
   * @member {IFloorPosition | IWallPosition}
   * @readonly
   * @public
   */


  /**
   * Update the furniture position.
   *
   * @param {IFloorPosition} [position] - The new furniture position.
   * @public
   */


  /**
   * Reference to the furniture direction.
   *
   * @member {Direction}
   * @readonly
   * @public
   */
  /*public get direction(): Direction {
    return this._direction;
  }*/

  /**
   * Update the furniture direction.
   *
   * @param {Direction} [direction] - The new furniture direction.
   * @public
   */
  /*public set direction(direction: Direction) {
    this._direction = direction;
    this._visualization.render();
  }*/

  /**
   * Reference to the furniture state.
   *
   * @member {number}
   * @readonly
   * @public
   */
  public get state(): number {
    return this._state;
  }

  /**
   * Update the furniture state (so the animation).
   *
   * @param {number} [state] - The new furniture state.
   * @public
   */
  public set state(state: number) {
    this._state = state;
    this._visualization.render();
  }

  /**
   * Reference to the furniture selection state.
   *
   * @member {boolean}
   * @readonly
   * @public
   */
  public get selected(): boolean {
    return this._selected;
  }

  /**
   * Update the furniture selection state (add the wired selection filter to the furniture).
   *
   * @param {boolean} [selected] - The new furniture selection state.
   * @public
   */
  public set selected(selected: boolean) {
    this._selected = selected;
    this._visualization.render();
  }

  /**
   * Reference to the furniture data.
   *
   * @member {FurnitureData}
   * @readonly
   * @public
   */
  public get data(): FurnitureData {
    return this._data;
  }
}
