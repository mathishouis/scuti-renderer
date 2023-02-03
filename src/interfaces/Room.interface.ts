import {StairType} from "../types/StairType";
import {Direction} from "../types/Direction";
import {WallType} from "../types/WallType";
import {RoomMaterial} from "../objects/rooms/RoomMaterial";

export interface RoomConfiguration {
    tileMap: string,
    floorMaterial?: RoomMaterial,
    floorThickness?: number,
    wallMaterial?: RoomMaterial,
    wallHeight?: number,
    wallThickness?: number
}

export interface TileConfiguration {
    material?: RoomMaterial,
    thickness?: number,
    position: Position
}

// TODO: Replace with FloorConfiguration?
export interface StairConfiguration {
    material?: RoomMaterial,
    thickness?: number,
    type: StairType,
    position: Position
}

export interface WallConfiguration {
    material?: RoomMaterial,
    thickness?: number,
    height?: number,
    position: Position,
    type: WallType,
    door?: boolean,
}

export interface Position {
    x: number,
    y: number,
    z: number,
    direction?: number
}

export interface Position2D {
    x: number,
    y: number
}

export interface TileInfo {
    tile: boolean,
    door: boolean,
    height: number,
    stairType: { type: StairType, direction: Direction },
    wallType: WallType
}
