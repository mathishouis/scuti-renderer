import { Container } from 'pixi.js';

import type { RoomObject } from '../objects/RoomObject';
import type { Room } from '../Room';

/**
 * RoomObjectLayer class that manage all the room objects.
 *
 * @class
 * @memberof Scuti
 */
export class RoomObjectLayer extends Container {
  /**
   * The room instance that will be managed by the camera.
   *
   * @member {Room}
   * @private
   */
  private readonly _room: Room;

  /**
   * The object list.
   *
   * @member {RoomObject[]}
   * @private
   */
  private _objects: RoomObject[] = [];

  /**
   * @param {Room} [room] - The room instance that we want to visualize.
   */
  constructor(room: Room) {
    super();
    this.sortableChildren = true;
    this._room = room;
  }

  /**
   * Add the given room object into the object layer of the room.
   *
   * @param {RoomObject} [object] - The room object that we want to add.
   * @return {void}
   * @public
   */
  public add(object: RoomObject): void {
    object.room = this._room;
    this._objects.push(object);
    if (object.onRoomAdded !== undefined) object.onRoomAdded(this._room);
    if (object.visualization.loaded) object.visualization.render();
    else object.visualization.renderPlaceholder();
  }

  /**
   * Remove the given room object into the object layer of the room.
   *
   * @param {RoomObject} [object] - The room object that we want to remove.
   * @return {void}
   * @public
   */
  public remove(object: RoomObject): void {
    if (object.onRoomRemoved !== undefined) object.onRoomRemoved(this._room);
    object.room = undefined;
    this._objects = this._objects.filter((fObject: RoomObject) => {
      return fObject !== object;
    });
    object.destroy();
  }
}
