export interface RoomMaterial {
  type: string;
  name: string;
  visualizationType: string;
  logicType: string;
  spritesheet: string;
  assets: Record<string, Assets>;
  wallData: WallData;
  floorData: FloorData;
  landscapeData: LandscapeData;
  maskData: MaskData;
}

export interface Assets {
  x: number;
  y: number;
  source?: string;
  flipH?: boolean;
}

export interface FloorDataMaterial {
  id: string;
  matrices: PurpleMatrix[];
}

export interface PurpleMatrix {
  columns: PurpleColumn[];
}

export interface FloorData {
  floors: Floor[];
  materials: FloorDataMaterial[];
  textures: Texture[];
}

export interface WallData {
  walls: Floor[];
  materials: FloorDataMaterial[];
  textures: Texture[];
}

export interface Floor {
  id: string;
  visualizations: FloorVisualization[];
}

export interface Texture {
  id: string;
  bitmaps: Bitmap[];
}

export interface Bitmap {
  assetName: string;
}
