import { Vector3D } from "../types/Vector.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";
import { StairType } from "../enums/StairType.ts";
import { Direction } from "../enums/Direction.ts";

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
