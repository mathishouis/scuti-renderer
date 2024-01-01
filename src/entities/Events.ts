import { OffsetVector2D, Vector3D } from '../types/Vector';
import { Direction } from '../enums/Direction';

export interface TileEvent {
  position: Vector3D;
  dragging: boolean;
}

export interface WallEvent {
  position: OffsetVector2D;
  direction: Direction;
  dragging: boolean;
}
