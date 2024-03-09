import { Vector2D, Vector3D } from './Vector';
import { Direction } from '../enums/Direction';
import { StairType } from '../enums/StairType';

export interface TileMesh {
  position: Vector3D;
  size: Vector2D;
  door: boolean;
}

export interface StairMesh {
  position: Vector3D;
  length: number;
  direction: Direction;
  corners: {
    left: StairType;
    right: StairType;
  };
}

export interface WallMesh {
  position: Vector3D;
  length: number;
  direction: Direction;
  corner: boolean;
  door?: number;
}
