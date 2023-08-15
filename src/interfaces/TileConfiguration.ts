import { Position3D } from "./Position.ts";

export interface TileConfiguration {
    material?: number;
    position: Position3D;
    size: Position3D;
}
