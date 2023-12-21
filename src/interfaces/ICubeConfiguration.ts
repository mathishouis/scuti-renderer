import { Vector2D, Vector3D } from '../types/Vector';
import { FloorMaterial } from '../objects/rooms/materials/FloorMaterial';
import { Layer } from '@pixi/layers';
import { WallMaterial } from '../objects/rooms/materials/WallMaterial';

export interface ICubeConfiguration {
  material?: FloorMaterial | WallMaterial;
  size: Vector3D;
  offsets?: Record<number, Vector2D>;
  zOrders?: Record<number, number>;
  layer?: Layer;
}
