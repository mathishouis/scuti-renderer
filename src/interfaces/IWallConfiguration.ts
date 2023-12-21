import { Vector3D } from '../types/Vector';
import { WallMaterial } from '../objects/rooms/materials/WallMaterial';
import { Direction } from '../enums/Direction';

export interface IWallConfiguration {
  material?: WallMaterial;
  position: Vector3D;
  length: number;
  thickness: number;
  floorThickness: number;
  height: number;
  direction: Direction;
  corner: boolean;
  door?: number;
}
