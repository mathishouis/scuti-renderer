import { Vector2D, Vector3D } from '../types/Vector.ts';
import { FloorMaterial } from '../objects/rooms/materials/FloorMaterial.ts';

export interface ITileConfiguration {
  material?: FloorMaterial;
  position: Vector3D;
  size: Vector2D;
  thickness: number;
  door?: boolean;
}
