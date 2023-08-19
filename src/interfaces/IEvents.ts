import { Vector3D } from "../types/Vector.ts";

export interface ITileEvent {
    position: Vector3D;
    dragging: boolean;
}
