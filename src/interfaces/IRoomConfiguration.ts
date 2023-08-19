import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";

export interface IRoomConfiguration {
    heightMap: string;
    floorMaterial?: FloorMaterial;
    floorThickness?: number;
    floorHidden?: boolean;
    wallMaterial?: number;
    wallThickness?: number;
    wallHeight?: number;
    wallHidden?: boolean;
    dragging?: boolean;
    centerCamera?: boolean;
    zoom?: number;
}
