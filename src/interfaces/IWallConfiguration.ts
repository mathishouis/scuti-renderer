import { Vector3D } from "../types/Vector.ts";
import { WallMaterial } from "../objects/rooms/materials/WallMaterial.ts";
import { Direction } from "../enums/Direction.ts";

export interface IWallConfiguration {
    material?: WallMaterial;
    position: Vector3D;
    length: number;
    thickness: number;
    height: number;
    direction: Direction;
}
