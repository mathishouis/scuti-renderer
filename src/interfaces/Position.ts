export type Position3D = Record<"x" | "y" | "z", number>

export type Position2D = Omit<Position3D, "z">;

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
