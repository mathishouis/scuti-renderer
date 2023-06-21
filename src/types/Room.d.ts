import type { StairType } from '../enums/StairType';
import type { Direction } from '../enums/Direction';
import type { WallType } from '../enums/WallType';
import type { Material } from '../objects/rooms/materials/Material';
import type { IFloorPosition, IWallPosition } from './Furniture';
import type { IAvatarPosition } from './Avatar';

export type TileMap = string[][];

export interface IRoomConfig {
  tileMap: string;
  floorMaterial?: Material;
  floorThickness?: number;
  wallMaterial?: Material;
  wallHeight?: number;
  wallThickness?: number;
}

export interface IRoomObjectConfig {
  position: IWallPosition | IFloorPosition | IAvatarPosition;
  direction: Direction;
}

export interface ITileConfiguration {
  material?: Material;
  thickness?: number;
  position: IPosition3D;
}

export interface IStairConfiguration {
  material?: Material;
  thickness?: number;
  type: StairType;
  position: IPosition3D;
}

export interface IWallConfiguration {
  material?: Material;
  thickness?: number;
  height?: number;
  position: IPosition3D;
  type: WallType;
  door?: boolean;
}

export interface ICursorConfiguration {
  position: IPosition3D;
}

export interface IPosition3D {
  x: number;
  y: number;
  z: number;
  direction?: number;
}

export interface IPosition2D {
  x: number;
  y: number;
}

export interface ITileInfo {
  tile: boolean;
  door: boolean;
  height: number;
  stairType?: { type: StairType; direction: Direction };
  wallType?: WallType;
}

// missing types here
export interface RoomMaterial {
  assets: { x: string; y: string; source?: string; flipH?: boolean };
  floorData: {
    floors: Array<{
      id: string;
      visualizations: Array<{ size: number; layers: Array<{ color: number; materialId: string }> }>;
    }>;
  };
  materials: Array<{
    id: string;
    matrices: Array<{ columns: Array<{ width: number; cells: Array<{ textureId: string }> }> }>;
  }>;
  textures: Array<{ id: string; bitmaps: Array<{ assetName: string }> }>;
  wallData: Array<{
    materials: Array<{
      id: string;
      matrices: Array<{ columns: Array<{ width: number; cells: Array<{ textureId: string }> }> }>;
    }>;
    textures: Array<{ id: string; bitmaps: Array<{ assetName: string }> }>;
    walls: Array<{
      id: string;
      visualizations: Array<{ size: number; layers: Array<{ color: number; materialId: string }> }>;
    }>;
  }>;
  landscapeData: object;
  // ...
  visualizationType: string;
  type: string;
  logicType: string;
  spritesheet: string;
  name: string;
  maskData: {
    masks: Array<{
      id: string;
      visualizations: Array<{ size: number; layers: Array<{ color: number; materialId: string }> }>;
    }>;
  };
}
