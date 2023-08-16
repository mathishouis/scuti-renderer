import { Position2D, Position3D } from "./Position.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";

export interface TileConfiguration {
    material?: FloorMaterial;
    position: Position3D;
    size: Position2D;
    thickness: number;
}
