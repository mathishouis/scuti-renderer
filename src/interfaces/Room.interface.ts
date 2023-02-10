import { StairType } from "../types/StairType";
import { Direction } from "../types/Direction";
import { WallType } from "../types/WallType";
import { Material } from "../objects/rooms/materials/Material";

export type TileMap = string[][];

export interface IRoomConfiguration {
    tileMap: string,
    floorMaterial?: Material,
    floorThickness?: number,
    wallMaterial?: Material,
    wallHeight?: number,
    wallThickness?: number
}

export interface ITileConfiguration {
    material?: Material,
    thickness?: number,
    position: IPosition3D
}

export interface IStairConfiguration {
    material?: Material,
    thickness?: number,
    type: StairType,
    position: IPosition3D
}

export interface IWallConfiguration {
    material?: Material,
    thickness?: number,
    height?: number,
    position: IPosition3D,
    type: WallType,
    door?: boolean,
}

export interface ICursorConfiguration {
    position: IPosition3D
}

export interface IPosition3D {
    x: number,
    y: number,
    z: number,
    direction?: number
}

export interface IPosition2D {
    x: number,
    y: number
}

export interface ITileInfo {
    tile: boolean,
    door: boolean,
    height: number,
    stairType: { type: StairType, direction: Direction },
    wallType: WallType
}
