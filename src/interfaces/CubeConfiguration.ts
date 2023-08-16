import { Position3D } from "./Position.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";

export interface CubeConfiguration {
    material?: FloorMaterial;
    size: Position3D;
}
