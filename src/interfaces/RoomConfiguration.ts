export interface RoomConfiguration {
    heightMap: string;
    floorMaterial?: number;
    floorThickness?: number;
    floorHidden?: number;
    wallMaterial?: number;
    wallThickness?: number;
    wallHeight?: number;
    wallHidden?: boolean;
    dragging?: boolean;
    centerCamera?: boolean;
}