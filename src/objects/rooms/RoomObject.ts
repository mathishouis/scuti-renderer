import type { Ticker } from 'pixi.js';
import { Container } from 'pixi.js';

import type { Room } from './Room';

/**
 * RoomObject class that is extended by the avatars or furnitures.
 *
 * @class
 * @memberof Scuti
 */
export class RoomObject extends Container {
  /**
   * Start the animation of the room object.
   *
   * @member {void}
   * @public
   */
  public start!: () => void;

  /**
   * Stop the animation of the room object.
   *
   * @member {void}
   * @public
   */
  public stop!: () => void;

  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room}
   * @private
   */
  private _room!: Room;

  /**
   * Destroy the room object and remove it from the canvas
   *
   * @return {void}
   * @public
   */
  /*public destroy(): void {

  }*/

  /**
   * Reference to the room object room instance.
   *
   * @member {Room}
   * @readonly
   * @public
   */
  public get room(): Room {
    return this._room;
  }

  /**
   * Update the current room instance.
   *
   * @param {Room} [room] - The new room instance.
   * @public
   */
  public set room(room: Room) {
    this._room = room;
  }

  /**
   * Reference to the room animation ticker instance.
   *
   * @member {Ticker}
   * @readonly
   * @public
   */
  public get animationTicker(): Ticker {
    return this._room.view.animationTicker;
  }
}
