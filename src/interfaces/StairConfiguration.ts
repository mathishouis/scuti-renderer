import { Direction, Position3D } from "./Position.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";
import { StairCorner } from "./StairCorner.ts";

export interface StairConfiguration {
    material?: FloorMaterial;
    position: Position3D;
    thickness: number;
    length: number;
    direction: Direction;
    leftCorner?: StairCorner;
    rightCorner?: StairCorner;
}
