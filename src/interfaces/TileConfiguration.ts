import { Position3D } from "./Position.ts";

export interface TileConfiguration {
    material?: number;
    thickness: number;
    position: Position3D;
}
