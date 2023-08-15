export interface Position3D {
    x: number;
    y: number;
    z: number;
}

export interface Position2D {
    x: number;
    y: number;
}

export enum Direction {
    NORTH,
    NORTH_EAST,
    EAST,
    SOUTH_EAST,
    SOUTH,
    SOUTH_WEST,
    WEST,
    NORTH_WEST
}
