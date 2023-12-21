import { FloorMaterial } from '../objects/rooms/materials/FloorMaterial';
import { WallMaterial } from '../objects/rooms/materials/WallMaterial';

export interface IRoomConfiguration {
  heightMap: string;
  floorMaterial?: FloorMaterial;
  floorThickness?: number;
  floorHidden?: boolean;
  wallMaterial?: WallMaterial;
  wallThickness?: number;
  wallHeight?: number;
  wallHidden?: boolean;
  dragging?: boolean;
  centerCamera?: boolean;
  zoom?: number;
}
