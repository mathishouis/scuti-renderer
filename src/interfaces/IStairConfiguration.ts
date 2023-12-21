import { Vector3D } from '../types/Vector';
import { FloorMaterial } from '../objects/rooms/materials/FloorMaterial';
import { StairType } from '../enums/StairType';
import { Direction } from '../enums/Direction';

export interface IStairConfiguration {
  material?: FloorMaterial;
  position: Vector3D;
  thickness: number;
  length: number;
  direction: Direction;
  corners: {
    left: StairType;
    right: StairType;
  };
}
