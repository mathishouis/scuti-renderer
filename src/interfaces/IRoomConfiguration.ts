import { FloorMaterial } from "../objects/rooms/materials/FloorMaterial.ts";
import { WallMaterial } from "../objects/rooms/materials/WallMaterial.ts";

export interface IRoomConfiguration {
    heightMap: string;
    floorMaterial?: FloorMaterial;
    floorThickness?: number;
    floorHidden?: boolean;
    wallMaterial?: WallMaterial;
    wallThickness?: number;
    wallHeight?: number;
    wallHidden?: boolean;
    dragging?: boolean;
    centerCamera?: boolean;
    zoom?: number;
}
