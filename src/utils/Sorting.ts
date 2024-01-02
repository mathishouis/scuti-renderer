import { OffsetVector2D, Vector2D, Vector3D } from '../types/Vector';

const PRIORITY_WALL = 6;
const PRIORITY_FLOOR = 6;
const PRIORITY_LANDSCAPE = 7;
const PRIORITY_DOOR = 5;
const PRIORITY_TILE_CURSOR = 11;
const PRIORITY_TILE_CURSOR_DOOR = 5;
const PRIORITY_ROOM_AVATAR = 11;
const PRIORITY_ROOM_ITEM = 11;
const PRIORITY_WALL_ITEM = 10;
const PRIORITY_MULTIPLIER = 10000000;

const COMPARABLE_X_Y = 1000000;
const COMPARABLE_Z = 10000;

function floorOrder(position: Vector3D, door = false): number {
  if (door) return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_DOOR;
  return (position.x + position.y + position.z) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_FLOOR;
}

function wallOrder(position: Vector2D): number {
  return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_WALL;
}

function cursorOrder(position: Vector3D, door = false): number {
  if (door) return (position.x + position.y) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_TILE_CURSOR_DOOR;
  return (position.x + position.y + position.z) * COMPARABLE_X_Y + PRIORITY_MULTIPLIER * PRIORITY_TILE_CURSOR;
}

function floorFurnitureOrder(position: Vector3D, z: number): number {
  const compareY = Math.trunc(z / 100) / 10;
  return (position.x + position.y + compareY) * COMPARABLE_X_Y + position.z * COMPARABLE_Z + PRIORITY_MULTIPLIER * PRIORITY_ROOM_ITEM;
}

function wallFurnitureOrder(position: OffsetVector2D, z: number): number {
  return (position.x + position.y) * COMPARABLE_X_Y + z * COMPARABLE_Z + PRIORITY_MULTIPLIER * PRIORITY_WALL_ITEM;
}

function landscapeOrder(): number {
  return PRIORITY_MULTIPLIER * PRIORITY_LANDSCAPE;
}

export { floorOrder, wallOrder, cursorOrder, floorFurnitureOrder, wallFurnitureOrder, landscapeOrder };
