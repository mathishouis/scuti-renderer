import type { RoomObject } from '../objects/RoomObject';
import type { Room } from '../Room';

/**
 * RoomObjectLayer class that manage all the room objects.
 *
 * @class
 * @memberof Scuti
 */
export class RoomObjectLayer {
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
    this._room = room;
  }

  /**
   * Add the given room object into the object layer of the room.
   *
   * @param {RoomObject[]} [objects] - The room objects that we want to add.
   * @return {void}
   * @public
   */
  public add(...objects: RoomObject[]): void {
    return objects.forEach((object) => {
      object.room = this._room;
      this._objects.push(object);
      // @ts-expect-error
      this._room.visualization.addChild(object);
      if (object.onRoomAdded !== undefined) object.onRoomAdded(this._room);
      if (object.visualization.loaded) object.visualization.render();
      else object.visualization.renderPlaceholder();
    });
  }

  /**
   * Remove the given room object into the object layer of the room.
   *
   * @param {RoomObject[]} [objects] - The room objects that we want to remove.
   * @return {void}
   * @public
   */
  public remove(...objects: RoomObject[]): void {
    return objects.forEach((object) => {
      if (object.onRoomRemoved !== undefined) object.onRoomRemoved(this._room);

      object.room = undefined;
      // @ts-expect-error
      this._room.visualization.removeChild(object);
      this._objects = this._objects.filter((fObject) => fObject !== object);

      object.destroy();
    });
  }
}
