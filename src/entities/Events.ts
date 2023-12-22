import { Vector3D } from '../types/Vector';

export interface TileEvent {
  position: Vector3D;
  dragging: boolean;
}
