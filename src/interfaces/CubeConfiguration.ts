import { Position2D, Position3D } from "./Position.ts";
import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";
import {Layer} from "@pixi/layers";

export interface CubeConfiguration {
    material?: FloorMaterial;
    size: Position3D;
    offsets?: Record<number, Position2D>;
    layer?: Layer;
    zOrder?: number;
}
