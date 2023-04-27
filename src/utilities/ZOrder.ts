import { IPosition2D, IPosition3D } from "../interfaces/Room";
import { IFloorPosition, IWallPosition } from "../interfaces/Furniture";

/**
 * Priority values
 */
const PRIORITY_TILE_CURSOR = 11;
const PRIORITY_ROOM_AVATAR = 11;
const PRIORITY_ROOM_ITEM = 11;
const PRIORITY_WALL_ITEM = 9;
const PRIORITY_MULTIPLIER = 10000000;

/**
 * Comparable values
 */
const COMPARABLE_X_Y = 1000000;
const COMPARABLE_Z = 10000;

/**
 * ZOrder class that manage the z ordering of the room objects.
 *
 * @class Scuti
 * @memberof
 */
export class ZOrder {
  /**
   * Return the zOrder of an avatar by it's position in the room.
   *
   * @param {IPosition3D} [position] - The avatar position in the room.
   * @return {number}
   * @private
   */
  public static avatar(position: IPosition3D): number {
    return (((Math.floor(position.x) + Math.floor(position.y)) * COMPARABLE_X_Y + (position.z + 0.001 * COMPARABLE_Z)) + PRIORITY_MULTIPLIER * PRIORITY_ROOM_AVATAR);
  }

  /**
   * Return the zOrder of the tile cursor by it's position in the room.
   *
   * @param {IPosition2D} [position] - The tile cursor position in the room.
   * @return {number}
   * @private
   */
  public static tileCursor(position: IPosition2D) {
    return (((position.x + position.y) * COMPARABLE_X_Y) + PRIORITY_MULTIPLIER * PRIORITY_TILE_CURSOR) - 500000;
  }

  /**
   * Return the zOrder of a floor item by it's position in the room.
   *
   * @param {IFloorPosition} [position] - The floor item position in the room.
   * @param {number} [z] - The z value of the layer.
   * @return {number}
   * @private
   */
  public static floorItem(position: IFloorPosition, z: number) {
    const compareY = (Math.trunc(z / 100)) / 10;
    return (((position.x + position.y + compareY) * COMPARABLE_X_Y + (position.z * COMPARABLE_Z)) + PRIORITY_MULTIPLIER * PRIORITY_ROOM_ITEM);
  }

  /**
   * Return the zOrder of a wall item by it's position in the room.
   *
   * @param {IPosition3D} [position] - The wall item position in the room.
   * @param {number} [z] - The z value of the layer.
   * @return {number}
   * @private
   */
  public static wallItem(position: IWallPosition, z: number) {
    return ((position.x + position.y) * COMPARABLE_X_Y) + (z * COMPARABLE_Z) + (PRIORITY_MULTIPLIER * PRIORITY_WALL_ITEM);
  }
}
