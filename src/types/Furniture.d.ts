import type { BLEND_MODES } from 'pixi.js';

import type { Direction } from '../enums/Direction';
import type { Dimension } from './Dimension';
import type { IRoomObjectConfig } from './Room';

export type IFloorPosition = Dimension.IPosition3D;
export type IWallPosition = Dimension.IPosition2D & Dimension.IOffsets2D;

export interface IFloorFurnitureConfiguration {
  id: number;
  position: IFloorPosition;
  direction: Direction;
  state?: number;
}

export interface IWallFurniConfig extends IRoomObjectConfig {
  id: number;
  state?: number;
}

export interface IFurnitureData {
  floorItems: IFloorItem[];
  wallItems: IWallItem[];
}

export interface ISharedFurniData {
  id: number;
  className: string;
}

export interface IFloorItem extends ISharedFurniData {
  name: string;
  description: string;
  furniLine: string;
  offerId: number;
  adUrl: string;
  excludeDynamic: false;
  specialType: number;
  customParams: null;
}

export interface IWallItem extends ISharedFurniData {
  name: string;
  description: string;
  furniLine: string;
  offerId: number;
  adUrl: string;
  excludeDynamic: boolean;
  specialType: number;
  customParams: string;
  dimensions: {
    x: number;
    y: number;
    defaultDirection: number;
  };
  canStandOn: boolean;
  canSitOn: boolean;
  canLayOn: boolean;
}

export interface IFurnitureProperty {
  dimensions: Dimension.IPosition2D; // not sure { x: .., y: .. }
  infos: { logic: string; visualization: string };
  visualization: IFurnitureVisualization;
}

export interface IFurnitureVisualization {
  layerCount: number;
  directions: Direction[];
  colors: Record<string, Record<string, `#${string}`>>;
  layers: Array<{ z: number; ignoreMouse: boolean; tag: string; alpha: number; ink: keyof typeof BLEND_MODES }>; // wrong types here
  animation: Record<string, Record<string, { frameSequence: number[] }>>;
}

export interface IFurnitureLayerConfiguration {
  layer: number | string;
  alpha: number;
  tint?: number | undefined;
  z: number;
  blendMode: BLEND_MODES;
  flip: boolean;
  frame: number;
  ignoreMouse: boolean;
  direction: Direction;
  tag?: string;
}

export interface IFurnitureLayerData {
  layer: number | string;
  alpha: number;
  tint?: number | undefined;
  z: number;
  blendMode: BLEND_MODES;
  flip: boolean;
  frame: number;
  ignoreMouse: boolean;
  direction: Direction;
  tag?: string;
}
