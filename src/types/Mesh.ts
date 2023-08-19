import { Vector2D, Vector3D } from "./Vector.ts";
import { Direction } from "../enums/Direction.ts";
import { StairType } from "../enums/StairType.ts";

export type TileMesh = {
    position: Vector3D,
    size: Vector2D
}

export type StairMesh = {
    position: Vector3D,
    length: number,
    direction: Direction,
    corners: {
        left: StairType,
        right: StairType
    }
}

