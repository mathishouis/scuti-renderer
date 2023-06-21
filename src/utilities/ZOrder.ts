import type { IPosition2D, IPosition3D } from '../types/Room';
import type { IFloorPosition, IWallPosition } from '../types/Furniture';

/**
 * Priority values
 */
const PRIORITY_WALL = 6;
const PRIORITY_FLOOR = 7;
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
 * Return the zOrder of an avatar by it's position in the room.
 *
 * @param {IPosition3D} [position] - The avatar position in the room.
 * @return {number}
 * @private
 */
const avatar = function (position: IPosition3D, z: number): number {
  return (
    (Math.floor(position.x) + Math.floor(position.y)) * COMPARABLE_X_Y +
    (position.z + 0.001 * COMPARABLE_Z) +
    PRIORITY_MULTIPLIER * PRIORITY_ROOM_AVATAR +
    z
  );
};

/**
 * Return the zOrder of the floor by it's position in the room.
 *
 * @param {IPosition2D} [position] - The floor position in the room.
 * @return {number}
 * @private
 */
const floor = function (position: IPosition2D): number {
  return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_WALL;
};

/**
 * Return the zOrder of the wall by it's position in the room.
 *
 * @param {IPosition2D} [position] - The wall position in the room.
 * @return {number}
 * @private
 */
const wall = function (position: IPosition2D): number {
  return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_WALL;
};

/**
 * Return the zOrder of the tile cursor by it's position in the room.
 *
 * @param {IPosition2D} [position] - The tile cursor position in the room.
 * @return {number}
 * @private
 */
const tileCursor = function (position: IPosition2D): number {
  return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_TILE_CURSOR;
};

/**
 * Return the zOrder of a floor item by it's position in the room.
 *
 * @param {IFloorPosition} [position] - The floor item position in the room.
 * @param {number} [z] - The z value of the layer.
 * @return {number}
 * @private
 */
const floorItem = function (position: IFloorPosition, z: number): number {
  const compareY = Math.trunc(z / 100) / 10;
  return (
    (position.x + position.y + compareY) * COMPARABLE_X_Y +
    position.z * COMPARABLE_Z +
    PRIORITY_MULTIPLIER * PRIORITY_ROOM_ITEM
  );
};

/**
 * Return the zOrder of a wall item by it's position in the room.
 *
 * @param {IPosition3D} [position] - The wall item position in the room.
 * @param {number} [z] - The z value of the layer.
 * @return {number}
 * @private
 */
const wallItem = function (position: IWallPosition, z: number): number {
  return (position.x + position.y) * COMPARABLE_X_Y + z * COMPARABLE_Z + PRIORITY_MULTIPLIER * PRIORITY_WALL_ITEM;
};

/**
 * ZOrder variable that manage the z ordering of room objects.
 */
export const ZOrder = { avatar, tileCursor, floorItem, wallItem, floor, wall };
